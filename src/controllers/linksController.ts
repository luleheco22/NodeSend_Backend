import { NextFunction, Request, Response } from 'express';
import Link from '../models/link';
import shortid from 'shortid'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

export const newLink = async (req: Request, res: Response, next: NextFunction) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Crear un objeto en la BD
    const { original_name, password, downloads, name } = req.body;

    const link = new Link();
    link.url = shortid.generate();
    link.name = name;
    link.original_name = original_name;

    //Si el usuario esta autenticado
    if ((<any>req).user) {
        // Asignar a enlace el numero de descargas
        if (downloads) {
            link.downloads = downloads;
        }

        // Asignar un password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash(password, salt);
        }
        // Asignar el autor
        link.author = (<any>req).user.id

    }

    // Almacenar en la BD
    try {
        await link.save();
        return res.json({ msg: `${link.url}` });
        next();
    } catch (error) {
        console.log(error)
    }
}

// Obtener el link

export const getLink = async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.params
    // Verificar si existe el enlace
    const link = await Link.findOne({ url })

    if (!link) {
        res.json({ msg: 'El link no existe' });
        return next();
    }
    // Si el link existe
    if (link.password) {
        return res.json({ password: true, link: link.url })
    } else {
        return res.json({ file: link.name, password: false })
    }

    next();


}

// Obtener un listado de todos los enlaces
export const getAllLinks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const links = await Link.find({}).select('url -_id');
        res.json({ links })
    } catch (error) {
        console.log(error)
    }
}

// Verifica si el password del link es correcto

export const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.params;
    const { password } = req.body;
    // Consultar el enlace
    const link = await Link.findOne({url})
    if (link) {
        // Verificar password
        if (bcrypt.compareSync( password, link.password)) {
            // Permitir al usuario descragar el archivo
            next();
        } else {
            return res.json({msg: 'Password incorrecto'})
        }
        
    }

}


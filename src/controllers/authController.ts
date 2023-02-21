import { Request, Response, NextFunction } from 'express';
import Users from '../models/users';
import { validationResult } from 'express-validator'
import createJWT from '../helpers/generateJWT';



export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
        res.json({ msg: 'El usuario no existe', login: false });
        return next();
    }

    // Verificar el password y autenticar el usuario
    //Comprobar su password
    if (await user?.comparePassword(password)) {
        //Retorna todos los datos del usuario , el token y un booleano para validar que logueo correctamente
        return res.json({
            ...user?.toJSON(),
            token: createJWT(user),
            login: true
        })
    }
    return res.json({ msg: "The password is wrong", login: false })
}


export const userAuthenticate = async (req: any, res: Response, next: NextFunction) => {
    res.json({ user: req.user })
}
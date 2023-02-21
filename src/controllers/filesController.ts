import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import shortid from 'shortid';
import fs from 'fs';
import Link from '../models/link';


export const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
    // Configuracion del multer
    const configMulter = {
        limits: { fileSize: (<any>req).user ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                //const extension = file.mimetype.split('/')[1];
                cb(null, `${shortid.generate()}${extension}`)
            },
        })
    }

    const upload = multer(configMulter).single('file')

    upload(req, res, async (error) => {
        console.log(req.file)

        if (!error) {
            res.json({ file: req.file?.filename })
        } else {
            console.log(error)
            return next()
        }
    });

}

export const deleteFile = async (req: Request, res: Response) => {
     console.log(req.file)

     try {
        fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
        console.log('Archivo eliminado');
     } catch (error) {
        console.log(error)
     }
}

// Descarga un archivo
export const downloadFile = async (req: Request, res: Response,  next: NextFunction) => {
    // Obtener enlace
    const { file } = req.params
    const link = await Link.findOne({name: file});
    console.log(link)
    const fileDownload = __dirname + '/../uploads/' + file
    res.download(fileDownload)
    // Eliminar el archivo y la entrada en la BD
    // Si las descragas son iguales a 1, entonces borrar la entrada y borrar el archivo
    if (link?.downloads === 1) {
        // Eliminar el archivo
        (<any>req).file = link.name;

        // Eliminar la entrada de la BD
        await Link.findByIdAndRemove(link._id);
        next(); // lo lleva al siguiente controller
    }else{
        // Si las descragas son > a 1 , entonces restar 1
      link!.downloads--;
      await link?.save();
    }


}


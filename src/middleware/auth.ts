import { Request, Response, NextFunction,  } from 'express';
import jwt, {JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const auth = (req:any, res:Response, next:NextFunction) => {
    const authHeader = req.get('Authorization');

    if (authHeader) {
        // Obtener el token
        const token = authHeader.split(' ')[1]
        // Comprobar el JWT 
        try {
            const user = jwt.verify(token, <string>process.env.JWT_SECRET)
            req.user = user;
        } catch (error) {
            console.log(error);
            res.json({msg: 'Token no valido'});
        }
    }
     return next();
}

export default auth
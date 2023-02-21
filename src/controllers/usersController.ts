import { Request, Response } from 'express';
import Users from '../models/users';
import {validationResult} from 'express-validator'

export const newUser = async (req:Request, res:Response):Promise<Response | any> => {

   // Mostrar mensajes de error de express validator
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
   }
   // Verificar si existe un usuario
   const {email}=req.body
   let user = await Users.findOne({email});

   if (user) {
      return res.json({msg: 'Usuario ya existe',create: false});
   }
    user = new Users(req.body)
    user.save();

    res.json({msg: 'Usuario creado',create: true})
      
}
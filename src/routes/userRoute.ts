import { Router } from "express";
import { newUser } from "../controllers/usersController";
import { check } from 'express-validator' 

const router = Router();

router.post('/add',
 [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'Agrega un email valido').isEmail(),
  check('password', 'El password debe ser de 6 caracteres').isLength({min: 6}),
 ],
newUser)

export default router;
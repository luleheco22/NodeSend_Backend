import { Router } from "express";
import { authenticateUser, userAuthenticate } from "../controllers/authController";
import { check } from 'express-validator' 
import auth from '../middleware/auth';

const router = Router();

router.post('/',
[
    check('email','Agrega un email valido').isEmail(),
    check('password','Password no puede ir vacio').not().isEmpty(),
],
authenticateUser);

router.get('/',auth, userAuthenticate);

export default router;

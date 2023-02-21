import { Router } from "express";
import { check } from 'express-validator' 
import { getAllLinks, getLink, newLink, verifyPassword } from "../controllers/linksController";
import auth from '../middleware/auth';

const router = Router();

router.post('/',
[
  check('name','Sube un archivo').not().isEmpty(),
  check('original_name','Sube un archivo').not().isEmpty(),
],
auth, newLink)

router.get('/',getAllLinks)

router.get('/:url',getLink)

router.post('/:url', verifyPassword, getLink)

export default router;

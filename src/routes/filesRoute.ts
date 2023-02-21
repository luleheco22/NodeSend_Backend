import { Router } from "express";
import { uploadFile, deleteFile, downloadFile } from "../controllers/filesController";
import auth from '../middleware/auth';
const router = Router();


router.post('/',auth, uploadFile)

router.delete('/:id', deleteFile)

router.get('/:file', downloadFile, deleteFile)

export default router;

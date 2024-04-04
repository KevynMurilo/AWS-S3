import { Router } from "express";
import multer from "multer";
import multerconfig from "../config/multer";

import { GetController } from "../controllers/GetController";
import { UploadController } from "../controllers/UploadController";
import { DeleteController } from "../controllers/DeleteController";

const routes = Router();
const upload = multer(multerconfig);

routes.get('/', new GetController().execute);
routes.post('/', upload.single('video'), new UploadController().execute);
routes.delete('/:filename', new DeleteController().execute);

export { routes };
import { Request, Response } from "express";
import { UploadService } from "../services/UploadService";

class UploadController{
  async execute(req: Request, res: Response) {
    const { file } = req;

    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const uploadService = new UploadService();

    try {
      await uploadService.execute(file);
      return res.send('Video Uploaded Successfully');
    } catch (error) {
      console.error('Error uploading video:', error);
      return res.status(500).send('Error uploading video.');
    }
  }
}

export { UploadController };
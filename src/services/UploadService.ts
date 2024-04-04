import { S3Storage } from "../utils/S3Storage";

class UploadService{
  async execute(file: Express.Multer.File) : Promise<void> {
    const s3Storage = new S3Storage();

    await s3Storage.saveFile(file.filename);
  }
}

export { UploadService };
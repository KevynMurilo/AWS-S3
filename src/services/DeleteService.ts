import { S3Storage } from "../utils/S3Storage";

class DeleteService {
  async execute(filename: string): Promise<string> {
    const s3Storage = new S3Storage();
    const files = await s3Storage.listFiles();

    if (!files.includes(filename)) {
      return 'File not found';
    }

    try {
      await s3Storage.deleteFile(filename);
      return 'File deleted successfully';
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Error deleting file.');
    }
  }
}

export { DeleteService };

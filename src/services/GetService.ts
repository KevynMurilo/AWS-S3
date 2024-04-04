import { S3Storage } from "../utils/S3Storage";

class GetService {
  async execute(): Promise<string[]> {
    const s3Storage = new S3Storage();
    return s3Storage.listFiles();
  }
}

export { GetService };

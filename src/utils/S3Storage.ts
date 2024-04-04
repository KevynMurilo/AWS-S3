import aws, { S3 } from "aws-sdk";
import mimeTypes from "mime-types";
import path from "path";
import fs from "fs";

import multerConfig from "../config/multer";

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, ENDPOINT, REGION } = process.env;

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      endpoint: ENDPOINT,
      region: REGION,
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    });
  }

  async listFiles(): Promise<string[]> {
    const data = await this.client.listObjects({ Bucket: 'iesgo' }).promise();
    return data.Contents?.map(obj => obj.Key || '') || [];
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);

    const ContentType = mimeTypes.lookup(originalPath); 

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client.putObject({
      Bucket: 'iesgo',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType
    })
    .promise();

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: 'iesgo',
      Key: filename,
    }).promise();
  }
}

export { S3Storage };

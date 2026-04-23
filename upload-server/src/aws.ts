import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: '../.env' });
console.log({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  endpoint: process.env.AWS_S3_ENDPOINT,
  bucket: process.env.AWS_S3_BUCKET,
});
const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_S3_ENDPOINT!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadFile = async (fileName: string, localfilePath: string) => {
  const fileContent = fs.readFileSync(localfilePath);
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileName,
    Body: fileContent,
  });
  const response = await s3.send(command);
  console.log(response);
};

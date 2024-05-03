import fs from "fs";
import path from "path";

export const decodeAndSaveBase64ToFile = (base64String, outputPath) => {
  const base64Data = base64String.split(",")[1];
  const decodedBuffer = Buffer.from(base64Data, "base64");
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);

  const extension = base64String.split(";")[0].split("/")[1];
  const uniqueFileName = `${timestamp}-${randomString}.${extension}`;
  const filePath = path.join(outputPath, uniqueFileName);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, decodedBuffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
};

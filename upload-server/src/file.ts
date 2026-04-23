import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string) => {
  let response: string[] = [];

  const allFiles = fs.readdirSync(folderPath);
  allFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      response = response.concat(getAllFiles(filePath));
    } else {
      response.push(filePath);
    }
  });
  return response;
};

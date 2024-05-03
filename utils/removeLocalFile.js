import fs from "fs";

export const removeLocalFile = async (filePath) => {
  return new Promise(async (resolve, reject) => {
    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error removing file:", err);
          reject(err);
          return;
        }
        resolve();
      });
    } else {
      console.log("file does not exist");
      resolve();
    }
  });
};

export const removeImages = async (imageArray) => {
  if (imageArray.length < 0) return null;
  for (const imagePath of imageArray) {
    const { pathname } = new URL(imagePath);
    const filepath = pathname.slice(1).replace(/\//g, "\\");

    try {
      if (filepath) {
        await removeLocalFile(filepath);
        console.log(`Removed local file for image: ${imagePath}`);
      } else {
        console.log(`Invalid filepath for image: ${imagePath}`);
      }
    } catch (error) {
      console.error(
        `Error removing local file for image ${imagePath}: ${error.message}`
      );
      // Handle the error as needed
    }
  }
};

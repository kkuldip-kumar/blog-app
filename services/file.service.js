import "dotenv/config";
import { removeLocalFile } from "../utils/removeLocalFile.js";
import url from "url";
import _ from "lodash";
class FileService {
  constructor() {}

  async uploadImageFile(filePath, req) {
    try {
      const hostUrl = `${req.protocol}://${req.get("host")}`;
      const fullUrl = url.resolve(hostUrl, filePath);
      return fullUrl;
    } catch (error) {
      console.error(error);
      await removeLocalFile(filePath);
      // return res.status(500).json({ message: "Error uploading image" });
    }
  }
}
export default new FileService();

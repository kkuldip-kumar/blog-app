import { Blog } from "../models/Blog.modal.js";

class BlogService {
  constructor() {}
  async getAllBlogs(res, query, options) {
    return await Blog.paginate(query, options, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error occurred while fetching users." });
      }
      return result;
    });
  }
}

export default new BlogService();

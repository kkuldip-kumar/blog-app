import { User } from "../models/User.modal.js";

class UserService {
  constructor() {}
  async getAllUser(res, query, options) {
    try {
      return await User.paginate(query, options, (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error occurred while fetching users." });
        }
        return result;
        // const {
        //   docs,
        //   total,
        //   totalPages,
        //   totalDocs,
        //   limit,
        //   page: pageVal,
        //   prevPage,
        //   nextPage,
        //   pages,
        // } = result;
        // res.json({
        //   ok: true,
        //   totalPages,
        //   total: total,
        //   totalDocs: totalDocs,
        //   data: docs,
        //   prevPage,
        //   nextPage,
        //   limit,
        //   page: pageVal,
        //   pages,
        // });
      });
    } catch (error) {}
  }
}

export default new UserService();

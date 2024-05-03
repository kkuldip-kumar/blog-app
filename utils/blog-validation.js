import Joi from "joi";
import joiObjectId from "joi-objectid";
Joi.objectId = joiObjectId(Joi);
const blogAddSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().empty(""),
  category: Joi.string().valid("Sports", "Health").required(),
});

export const validateBlog = async (blog) => blogAddSchema.validate(blog);

import * as yup from "yup";

export const initialBlogValue = {
  name: "",
  description: "",
  image: "",
  category: "",
};

export const blogSchema = yup.object().shape({
  name: yup.string().required("title is required"),
  description: yup.string().required("title is required"),
  category: yup.string().required("category is required"),
});

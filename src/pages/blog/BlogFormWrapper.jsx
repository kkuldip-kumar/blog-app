import { useSelector } from "react-redux";
import { BlogForm } from "./BlogForm";
import { useGetOneBlogQuery } from "src/store/blogs/blogService";
import { Loader } from "src/components/Loader";
import { ErrorsPage } from "src/components/ErrorsPage";
import { useListView } from "./ListViewProvider";

const BlogFormWrapper = () => {
  const { idForUpdate } = useListView();
  const idStatus =
    idForUpdate === null || idForUpdate === undefined ? true : false;
  const {
    data: blog,
    error,
    isLoading,
  } = useGetOneBlogQuery(idForUpdate, { skip: idStatus });

  if (isLoading) return <Loader />;
  if (error) return <ErrorsPage />;

  if (!idForUpdate) {
    return <BlogForm isLoading={isLoading} blogData={{ _id: undefined }} />;
  }
  if (!isLoading && !error && blog) {
    return <BlogForm isLoading={isLoading} blogData={blog} />;
  }

  return null;
};

export { BlogFormWrapper };

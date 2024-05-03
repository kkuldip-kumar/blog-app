import React from "react";
import { BlogTable } from "./blog/blog-table";
import { useGetAllBlogsQuery } from "src/store/blogs/blogService";
import { Loader } from "src/components/Loader";
import { ErrorsPage } from "src/components/ErrorsPage";
import { BlogModalForm } from "./blog/BlogModalForm";
import { TableToolbar } from "../components/TableToolbar";
import { useListView } from "./blog/ListViewProvider";

export const BlogTableList = () => {
  const { idForUpdate, setIdForUpdate } = useListView();
  const { data, error, isLoading } = useGetAllBlogsQuery();
  if (isLoading) return <Loader />;
  if (error) return <ErrorsPage />;
  const openModal = () => {
    setIdForUpdate(null);
  };
  return (
    <div>
      {idForUpdate !== undefined && <BlogModalForm />}
      <div className="d-flex justify-content-end mb-3">
        <TableToolbar title="Add Blog" openModal={openModal} />
      </div>
      <BlogTable blogs={data.data} />
    </div>
  );
};

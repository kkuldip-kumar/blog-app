import React from "react";
import { BlogTableList } from "./blog-table-list";
import { ListViewProvider } from "./blog/ListViewProvider";
// import { BlogModalForm } from "./blog/BlogModalForm";

export const BlogTableListWrapper = () => {
  return (
    <ListViewProvider>
      {/* <BlogModalForm /> */}
      <BlogTableList />
    </ListViewProvider>
  );
};

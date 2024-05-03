import React from "react";
import { Blog } from "./Blog";

export const BlogListWrapper = ({ blogs }) => {
  return (
    <div className="row">
      {blogs.map((blog) => (
        <div key={blog._id} className="col-lg-12 col-12 mb-3">
          <Blog blog={blog} />
        </div>
      ))}
    </div>
  );
};

import React from "react";

import { InfoCell } from "./Info-cell";
import { BlogsActionCell } from "./blog-action";
import { formatDateNew } from "src/utils/helper-function";

export const BlogTable = ({ blogs }) => {
  return (
    <div className="table-responsive custom_">
      <table className="table blog_tbl_cl">
        <thead>
          <tr>
            <th scope="col">Blog Title</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((row, index) => (
            <tr key={row._id}>
              <td className="tbl_nm">
                <InfoCell blog={row} />
              </td>
              <td className="tbl_nm">
                <p>{row.category}</p>
              </td>
              <td className="tbl_nm">{formatDateNew(row.createdAt)} </td>
              <td>
                <BlogsActionCell id={row._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.isArray(blogs) && blogs.length == 0 ? (
        <p className="py-4 text-center d-block">No blogs available</p>
      ) : null}
    </div>
  );
};

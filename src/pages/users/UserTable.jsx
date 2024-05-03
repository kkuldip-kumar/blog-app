import React from "react";
import { formatDateNew } from "src/utils/helper-function";
import { UserActions } from "./user-action";

export const BlogTable = ({ users }) => {
  return (
    <div className="table-responsive">
      <table className="table blog_tbl_cl">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {users?.map((row, index) => (
            <tr key={row._id}>
              <td className="tbl_nm">
                <p>{row.name}</p>
              </td>
              <td className="tbl_nm">
                <p>{row.role}</p>
              </td>
              <td className="tbl_nm">{formatDateNew(row.createdAt)} </td>
              <td>
                <UserActions id={row._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Array.isArray(users) && users.length == 0 ? (
        <p className="py-4 text-center d-block">No users available</p>
      ) : null}
    </div>
  );
};

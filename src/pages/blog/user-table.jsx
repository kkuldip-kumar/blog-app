import React from "react";

import { formatDateNew } from "src/utils/helper-function";
import { UserActions } from "../users/user-action";

export const UserTable = ({ users }) => {
  return (
    <div className="table-responsive custom_">
      <table className="table blog_tbl_cl">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Email</th>
            <th scope="col">Joined Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((row, index) => (
            <tr key={row._id}>
              <td className="min_width">
                <p>{row.name}</p>
              </td>
              <td className="min_width">
                <p>{row.role}</p>
              </td>
              <td className="min_width">
                <p>{row.email}</p>
              </td>
              <td className="min_width">{formatDateNew(row.createdAt)} </td>
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

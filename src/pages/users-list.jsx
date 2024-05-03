import React from "react";
import { UserListViewProvider } from "./users/ListViewProvider";
import { UserListWrapper } from "./users/UserListWrapper";

export const UserTableList = () => {
  return (
    <div>
      <UserListViewProvider>
        <UserListWrapper />
      </UserListViewProvider>
    </div>
  );
};

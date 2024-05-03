import React from "react";
import { Loader } from "src/components/Loader";
import { ErrorsPage } from "src/components/ErrorsPage";
import { TableToolbar } from "src/components/TableToolbar";
import { useGetAllUserQuery } from "src/store/users/userService";
import { UserTable } from "../blog/user-table";
import { useUserListView } from "./ListViewProvider";
import { UserEdiModalForm } from "./UserModalForm";

export const UserListWrapper = () => {
  const { idForUpdate, setIdForUpdate } = useUserListView();

  const { data, error, isLoading } = useGetAllUserQuery();
  if (isLoading) return <Loader />;
  if (error) return <ErrorsPage />;
  const openModal = () => {
    setIdForUpdate(null);
  };
  return (
    <div>
      {idForUpdate !== undefined && <UserEdiModalForm />}

      <div className="d-flex justify-content-end mb-3">
        <TableToolbar title="Add User" openModal={openModal} />
      </div>
      <UserTable users={data.user} />
    </div>
  );
};

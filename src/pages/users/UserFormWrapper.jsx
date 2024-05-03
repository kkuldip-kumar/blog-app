import { Loader } from "src/components/Loader";
import { ErrorsPage } from "src/components/ErrorsPage";
import { UserForm } from "./UserForm";
import { useUserListView } from "./ListViewProvider";
import { useGetOneUserQuery } from "src/store/users/userService";

export const UserFormWrapper = () => {
  const { idForUpdate } = useUserListView();
  const idStatus =
    idForUpdate === null || idForUpdate === undefined ? true : false;
  const {
    data: user,
    error,
    isLoading,
  } = useGetOneUserQuery(idForUpdate, { skip: idStatus });

  if (isLoading) return <Loader />;
  if (error) return <ErrorsPage />;

  if (!idForUpdate) {
    return <UserForm userData={{ _id: undefined }} />;
  }
  if (!isLoading && !error && user) {
    return <UserForm userData={user} />;
  }

  return null;
};

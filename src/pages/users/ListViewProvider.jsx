import { useState, createContext, useContext } from "react";

const initialListView = {
  idForUpdate: undefined,
  setIdForUpdate: () => {},
};
const ListViewContext = createContext(initialListView);

const UserListViewProvider = ({ children }) => {
  const [idForUpdate, setIdForUpdate] = useState(initialListView.idForUpdate);
  return (
    <ListViewContext.Provider
      value={{
        idForUpdate,
        setIdForUpdate,
      }}
    >
      {children}
    </ListViewContext.Provider>
  );
};

const useUserListView = () => useContext(ListViewContext);

export { UserListViewProvider, useUserListView };

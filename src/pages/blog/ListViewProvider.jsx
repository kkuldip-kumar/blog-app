import { useState, createContext, useContext } from "react";

const initialListView = {
  idForUpdate: undefined,
  setIdForUpdate: () => {},
};
const ListViewContext = createContext(initialListView);

const ListViewProvider = ({ children }) => {
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

const useListView = () => useContext(ListViewContext);

export { ListViewProvider, useListView };

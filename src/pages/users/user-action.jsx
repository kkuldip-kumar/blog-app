import { Ellipsis } from "lucide-react";
import { useRemoveOneUserMutation } from "src/store/users/userService";
import { useUserListView } from "./ListViewProvider";
const UserActions = ({ id }) => {
  const [removeOneUser] = useRemoveOneUserMutation();
  const { setIdForUpdate } = useUserListView();
  const deleteItem = async () => {
    await removeOneUser(id);
  };
  const editItem = async () => {
    setIdForUpdate(id);
  };
  return (
    <>
      <div className="action_drp_dwn">
        <div className="dropdown">
          <button
            className="btn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Ellipsis />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item pointer" onClick={editItem}>
                Edit
              </a>
            </li>
            <li>
              <a className="dropdown-item pointer" onClick={deleteItem}>
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export { UserActions };

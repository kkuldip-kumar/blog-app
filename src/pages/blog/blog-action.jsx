import { Ellipsis } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRemoveBlogMutation } from "src/store/blogs/blogService";
import { useListView } from "./ListViewProvider";
const BlogsActionCell = ({ id }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const { setIdForUpdate } = useListView();
  const [removeBlog] = useRemoveBlogMutation();

  const deleteItem = async () => {
    await removeBlog(id);
  };
  const editItem = async () => {
    setIdForUpdate(id);
  };
  // console.log("cc", currentUser._doc);
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
              <Link className="dropdown-item pointer" to={`/blogs/${id}`}>
                view
              </Link>
            </li>
            <li>
              <a
                className="dropdown-item pointer"
                onClick={editItem}
                data-bs-toggle="modal"
                data-bs-target="#blogModal"
              >
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

export { BlogsActionCell };

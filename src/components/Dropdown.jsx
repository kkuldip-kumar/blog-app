import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "src/store/auth/authSlice";

export const Dropdown = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="dropdown">
      <a
        className=" dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Profile
      </a>
      <ul className="dropdown-menu">
        <li>
          <Link className="dropdown-item" to="/admin/blogs">
            Dashboard
          </Link>
        </li>
        <li onClick={onLogout}>
          <a className="dropdown-item">Logout</a>
        </li>
      </ul>
    </div>
  );
};

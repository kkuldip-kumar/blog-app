import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn, typeof isLoggedIn);
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <div className="d-flex align-items-center">
            <div className="">
              <Link className="navbar-brand logo" to="/">
                Blog App
              </Link>
            </div>
            <div className="d-flex align-items-center" id="navbarTogglerDemo03">
              <ul className="d-flex align-items-center nw_list ">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="ml-auto">
            {isLoggedIn ? <Dropdown /> : <Link to="/auth">Login</Link>}
          </div>
        </div>
      </div>
    </nav>
  );
};

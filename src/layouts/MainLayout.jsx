import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import style from "./layout.module.css";
export const MainLayout = () => {
  return (
    <>
      <header className={style.header_wrp}>
        <div className="container">
          <NavBar />
        </div>
      </header>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

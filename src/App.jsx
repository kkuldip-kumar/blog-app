import { useState } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;

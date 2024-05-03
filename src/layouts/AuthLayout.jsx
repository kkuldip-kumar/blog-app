import { Outlet } from "react-router-dom";
export const AuthLayout = () => {
  return (
    <>
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

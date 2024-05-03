import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import App from "src/App";
import { ErrorsPage } from "src/components/ErrorsPage";
import { AuthPage } from "./AuthPage";
import { Posts } from "src/pages/Posts";
import { PostsDetail } from "src/pages/PostsDetail";
import { useSelector } from "react-redux";

// Base URL

// const { PUBLIC_URL } = process.env;

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route index path="/" element={<Posts />} />
          <Route path="blogs/:id" element={<PostsDetail />} />

          {isLoggedIn ? (
            <>
              <Route path="admin/*" element={<PrivateRoute />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };

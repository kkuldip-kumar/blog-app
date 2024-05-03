import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BlogTableListWrapper } from "src/pages/blog-table-list-wrapper";
import { BlogFormWrapper } from "src/pages/blog/BlogFormWrapper";
import { UserTableList } from "src/pages/users-list";

export const PrivateRoute = () => {
  return (
    <Routes>
      <Route>
        <Route
          path="/blogs"
          index
          element={
            <SuspenseView>
              <BlogTableListWrapper />
            </SuspenseView>
          }
        />
        <Route
          path="users"
          element={
            <SuspenseView>
              <UserTableList />
            </SuspenseView>
          }
        />
        <Route
          path="/add-blog"
          element={
            <SuspenseView>
              <BlogFormWrapper />
            </SuspenseView>
          }
        />
        <Route path="admin" element={<Navigate to="/admin/blogs" />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Route>
    </Routes>
  );
};

const SuspenseView = ({ children }) => {
  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./blogs/blogService";
import { userApi } from "./users/userService";
import { authApi } from "./auth/authService";
import authReducer from "./auth/authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(blogApi.middleware),
});
// setupListeners(store.dispatch);
export default store;

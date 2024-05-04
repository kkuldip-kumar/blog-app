import { createSlice } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "src/utils/token";
import { authApi } from "./authService";

const EmptyUser = {
  _id: "",
  name: "",
  email: "",
  role: "",
};
const initialState = {
  currentUser: {
    ...EmptyUser,
  },
  isLoggedIn: getToken() ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      removeToken();
      state.currentUser = EmptyUser;
      state.isLoggedIn = false;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        setToken(payload.api_token);
        state.isLoggedIn = true;
        console.log(payload.user);
        state.currentUser = payload.user;
      }
    );
  },
});

export const { logoutUser, updateCurrentUser } = authSlice.actions;

export default authSlice.reducer;

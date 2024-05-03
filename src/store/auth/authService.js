import { getToken, setToken } from "src/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = `${import.meta.env.VITE_APP_API_URL}`;
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  refetchOnReconnect: true,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // Login User
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    // forgot password
    forgotUserPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    // reset password
    resetUserPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});
export const {
  useForgotUserPasswordMutation,
  useResetUserPasswordMutation,
  useLoginUserMutation,
} = authApi;

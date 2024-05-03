import { getToken } from "src/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateCurrentUser } from "../auth/authSlice";
const apiUrl = `${import.meta.env.VITE_APP_API_URL}`;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),

  tagTypes: ["User"],
  endpoints: (builder) => ({
    // sign User
    signUpUser: builder.mutation({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
    // get all Users
    getAllUser: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["User"],
    }),
    // get one user
    getOneUser: builder.query({
      query: (id) => ({
        url: `users/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return {
          _id: response.user._id,
          role: response.user.role,
          email: response.user.email,
          name: response.user.name,
        };
      },
      providesTags: ["User"],
    }),

    // update one user
    updateOneUser: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `users/${_id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        updateCurrentUser(response.user);
        return {
          _id: response.user._id,
          role: response.user.role,
          email: response.user.email,
          name: response.user.name,
        };
      },
      invalidatesTags: ["User"],
    }),

    // remove one user
    removeOneUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useGetOneUserQuery,
  useGetAllUserQuery,
  useRemoveOneUserMutation,
  useUpdateOneUserMutation,
} = userApi;

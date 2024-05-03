import { getToken } from "src/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = `${import.meta.env.VITE_APP_API_URL}`;
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    // add new blog
    addNewBlog: builder.mutation({
      query: (newBlog) => ({
        url: "blogs",
        method: "POST",
        body: newBlog,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Blog"],
    }),

    // update the blog
    updateBlog: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `blogs/${_id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Blog"],
    }),
    // remove the blog
    removeBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Blog"],
    }),

    // get one Blog
    getOneBlog: builder.query({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Blog"],
    }),
    // get All the blogs
    getAllBlogs: builder.query({
      query: () => ({
        url: `blogs`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      providesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useRemoveBlogMutation,
  useGetOneBlogQuery,
  useAddNewBlogMutation,
} = blogApi;

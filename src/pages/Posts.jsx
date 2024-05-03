import React from "react";
import { BlogListWrapper } from "./blog/BlogListWrapper";
import style from "./blog/blog.module.css";
import { useGetAllBlogsQuery } from "src/store/blogs/blogService";
import { Loader } from "src/components/Loader";

export const Posts = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery();
  if (isLoading) return <Loader />;
  if (error) return <ErrorsPage />;
  return (
    <>
      <div className={style.main_title}>
        <h4>Top Blogs</h4>
        <p>stay updated with us</p>
      </div>
      <div className="container">
        {data && Array.isArray(data.data) ? (
          <BlogListWrapper blogs={data.data} />
        ) : null}
      </div>
    </>
  );
};

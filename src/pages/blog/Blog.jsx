import React from "react";
import style from "./blog.module.css";
import { BlogImage } from "./blog-image";
import { useNavigate } from "react-router-dom";
import { formatDateNew } from "src/utils/helper-function";
import { BlogContent } from "./blog-content";

export const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const openDetailPage = (id) => {
    navigate(`/blogs/${id}`);
  };
  return (
    <div className={style.blog_wrap} onClick={() => openDetailPage(blog._id)}>
      <div className={style.blog_content}>
        <BlogImage image={blog.image} />
        <div className={style.blog_body}>
          <h3>{blog.name}</h3>
          <div className="">
            <p>{formatDateNew(blog.createdAt)}</p>
          </div>
          <div className="">
            <BlogContent description={blog.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

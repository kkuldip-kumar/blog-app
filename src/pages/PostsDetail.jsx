import React from "react";
import style from "./blog/blog.module.css";
import { Loader } from "src/components/Loader";
import { ErrorsPage } from "src/components/ErrorsPage";
import { useGetOneBlogQuery } from "src/store/blogs/blogService";
import { useParams } from "react-router-dom";
import { formatDateNew } from "src/utils/helper-function";
import DOMPurify from "dompurify";

export const PostsDetail = () => {
  let { id } = useParams();
  const { data, error, isLoading } = useGetOneBlogQuery(id);
  if (isLoading) return <Loader />;
  if (error) return <ErrorsPage />;
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data.description),
  });
  return (
    <div className="container ">
      <div className={style.blog_dd_wrap}>
        <div className={style.blog_body}>
          <h3>{data.name}</h3>
          <div className="">
            <p>{formatDateNew(data.createdAt)}</p>
          </div>
          <div dangerouslySetInnerHTML={sanitizedData()} />
        </div>
      </div>
    </div>
  );
};

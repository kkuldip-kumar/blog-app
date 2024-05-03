import React from "react";
import img from "src/assets/blog-image.jpg";
import style from "./blog.module.css";
import blankImg from "src/assets/blank.svg";
export const BlogImage = ({ image }) => {
  return (
    <div className={style.image_wrapper}>
      <img
        src={image || blankImg}
        className={`img-responsive ${style.blog_image}`}
        alt="image"
      />
    </div>
  );
};

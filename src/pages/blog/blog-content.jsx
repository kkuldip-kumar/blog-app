import React from "react";
import DOMPurify from "dompurify";

export const BlogContent = ({ description }) => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(description),
  });
  return <div dangerouslySetInnerHTML={sanitizedData()} />;
};

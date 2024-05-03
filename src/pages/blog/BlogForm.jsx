import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema, initialBlogValue } from "./blog-validations";
import { BaseButton } from "src/components/BaseButton";

import { useAddNewBlogMutation } from "src/store/blogs/blogService";
import { useUpdateBlogMutation } from "src/store/blogs/blogService";
import { isBase64Image } from "src/utils/helper-function";
import { convertFileToBase64 } from "src/utils/helper-function";
import { BaseInput } from "src/components/BaseInput";
import blankImg from "src/assets/blank.svg";
import style from "src/components/forms/form.module.css";
import { useListView } from "./ListViewProvider";

export const BlogForm = ({ blogData }) => {
  const [addNewBlog] = useAddNewBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [loading, setLoading] = useState(false);
  const { setIdForUpdate } = useListView();
  const [blogForEdit] = useState({ ...initialBlogValue, ...blogData });
  const [previewImage, setPreviewImage] = useState(blogData?.image || blankImg);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: blogForEdit,
    resolver: yupResolver(blogSchema),
  });
  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    const imageString = data.image?.[0];
    let imageValueData = "";
    if (imageString instanceof File) {
      imageValueData = await convertFileToBase64(imageString);
    }
    const updatedData = {
      ...data,
      image: isBase64Image(imageValueData) ? imageValueData : data.image,
    };

    try {
      setLoading(true);
      if (updatedData._id) {
        const { data: resData, error: errData } = await updateBlog(updatedData);
        if (errData) {
          throw new Error(errData.data.message);
        }
        setPreviewImage(blankImg);
        setIdForUpdate(undefined);
        reset({});
      } else {
        const { data: resData, error: errData } = await addNewBlog(updatedData);
        if (errData) {
          throw new Error(errData.data.message);
        }
        setPreviewImage(blankImg);
        setIdForUpdate(undefined);
        reset({});
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("image", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-12  ">
          <div className="mb-3 text-center">
            <label className="form-label custom_label"> Image</label>
            <div
              className={` ${errors.avatar ? style.error : ""} image-container`}
            >
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                name="image"
                {...register("image")}
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />

              <div className="image-wrapper" onClick={handleImageClick}>
                <img
                  src={previewImage || "/imgs/blank.svg"}
                  alt="Preview"
                  className="image_box"
                  width={300}
                  height={200}
                />
              </div>
            </div>
            <label className="form-label form-label-style ">
              Allowed file types: (png, jpg, jpeg).
            </label>
            <div>
              {errors.image && (
                <p className="error-message">{errors.image.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6  ">
          <div className="mb-3">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <BaseInput
                  placeholder="Title"
                  label="Blog Title"
                  type="text"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                />
              )}
              name="name"
            />
            <div>
              {errors.title && (
                <p className={style.textColor}>{errors.title.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 ">
          <div className="mb-3">
            <label className="form-label">
              Select Category <span className="required-star">*</span>
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  {...register("category")}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue value="" disabled>
                    Select Category
                  </option>
                  <option value="Sports">Sports</option>
                  <option value="Health">Health</option>
                </select>
              )}
            />
            <div>
              {errors.category && (
                <p className={style.textColor}>{errors.category.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="mb-3">
            <label className="form-label"> Description </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                  theme="snow"
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      ["link"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["clean"],
                    ],
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="d-flex justify-content-end">
          <BaseButton label="Save" type="submit">
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </>
            ) : (
              ""
            )}
          </BaseButton>
          <BaseButton label="Cancel" className="reset_btn ms-3" type="reset" />
        </div>
      </div>
    </form>
  );
};

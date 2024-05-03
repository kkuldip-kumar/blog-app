import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalHeader } from "src/components/ModalHeader";
import { BlogFormWrapper } from "./BlogFormWrapper";
import { useListView } from "./ListViewProvider";

export const BlogModalForm = () => {
  const { setIdForUpdate } = useListView();
  const [openStatus, setStatus] = useState(false);
  useEffect(() => {
    document.body.classList.add("modal-open");

    document.body.style.overflow = "hidden";
    setStatus(true);
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      setStatus(false);
    };
  }, []);
  const closeModal = () => {
    setIdForUpdate(undefined);
  };
  return (
    <>
      {/* style={{ display: "block" }} */}
      <div
        className={`modal fade ${openStatus ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        style={{ display: openStatus ? "block" : "none" }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content ">
            <ModalHeader title="Add Blog" closeModal={closeModal} />
            <div className="modal-body">
              <BlogFormWrapper />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

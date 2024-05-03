import React, { useEffect, useState } from "react";
import { ModalHeader } from "src/components/ModalHeader";
import { useUserListView } from "../users/ListViewProvider";
import { UserFormWrapper } from "./UserFormWrapper";

export const UserEdiModalForm = () => {
  const { setIdForUpdate } = useUserListView();
  useEffect(() => {
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    };
  }, []);
  const closeModal = () => {
    setIdForUpdate(undefined);
  };
  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block" }}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content ">
            <ModalHeader title="Add User" closeModal={closeModal} />
            <div className="modal-body">
              <UserFormWrapper />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

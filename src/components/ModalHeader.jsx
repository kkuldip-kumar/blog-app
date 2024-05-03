import React from "react";

export const ModalHeader = ({ title, closeModal }) => {
  return (
    <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        {title}
      </h1>
      <button
        onClick={closeModal}
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
  );
};

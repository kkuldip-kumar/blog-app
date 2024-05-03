import React from "react";

export const TableToolbar = ({ title, openModal }) => {
  return (
    <button type="button" className="btn btn_primary" onClick={openModal}>
      {title}
    </button>
  );
};

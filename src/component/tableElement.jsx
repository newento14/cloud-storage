import React from "react";

const TableElement = ({ file }) => {
  let accessString = "Private";
  if (file.private === false) {
    accessString = "Through the link";
  }

  return (
    <div className="table-element">
      <div className="table-name">{file.name}</div>
      <div className="table-star">{file.starred}</div>
      <div className="table-size">{file.size}</div>
      <div className="table-access">{accessString}</div>
      <div className="table-date">{file.date}</div>
    </div>
  );
};

export default TableElement;

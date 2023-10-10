import React, { useState } from "react";
import starIcon from "../icons/star.png";
import starCheckedIcon from "../icons/starChecked.png";
import Api from "../Api/user";

const TableElement = ({ file }) => {
  const [checked, setChecked] = useState(file.starred);
  const [canClick, setCanClick] = useState(true);

  let accessString = "Private";
  if (file.private === false) {
    accessString = "Through the link";
  }

  async function starChecked() {
    if (!canClick) {
      return;
    }
    setCanClick(false);

    if (checked == false) {
      setChecked(true);
      await Api.SetStarred(file.id, true);
    } else {
      setChecked(false);
      await Api.SetStarred(file.id, false);
    }

    setTimeout(() => {
      setCanClick(true);
    }, 700);
  }

  return (
    <div className="table-element">
      <div className="table-name">{file.name}</div>
      <div className="table-star">
        <img
          className="table-star-icon"
          src={checked ? starCheckedIcon : starIcon}
          onClick={starChecked}
        />
      </div>
      <div className="table-size">{file.size}</div>
      <div className="table-access">{accessString}</div>
      <div className="table-date">{file.date}</div>
    </div>
  );
};

export default TableElement;

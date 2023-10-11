import React, { useState } from "react";
import starIcon from "../icons/star.png";
import folderIcon from "../icons/folder.png";
import fileIcon from "../icons/file.png";
import starCheckedIcon from "../icons/starChecked.png";
import Api from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_DIR } from "../reducers/fileReducer";

const TableElement = ({ file }) => {
  const dispatch = useDispatch();
  const currentDirPathId = useSelector((x) => x.files.currentDirPathId);
  const currentDirPathName = useSelector((x) => x.files.currentDirPathName);

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

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 B";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  function getInButton() {
    if (file.type === "dir")
      dispatch({
        type: SET_CURRENT_DIR,
        payload: {
          id: `${currentDirPathId}${file.id}\\`,
          name: `${currentDirPathName}${file.name}\\`,
        },
      });
  }

  return (
    <div className="table-element">
      <img
        className="table-icon"
        src={file.type === "dir" ? folderIcon : fileIcon}
      />
      <div className="table-name" onClick={getInButton}>
        {file.name}
      </div>
      <div className="table-star">
        <img
          className="table-star-icon"
          src={checked ? starCheckedIcon : starIcon}
          onClick={starChecked}
        />
      </div>
      <div className="table-size">
        {file.type !== "dir" && formatBytes(file.size)}
      </div>
      <div className="table-access">{accessString}</div>
      <div className="table-date">{file.date}</div>
    </div>
  );
};

export default TableElement;

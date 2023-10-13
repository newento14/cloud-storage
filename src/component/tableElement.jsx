import React, { useState } from "react";
import starIcon from "../assets/star.png";
import folderIcon from "../assets/folder.png";
import fileIcon from "../assets/file.png";
import starCheckedIcon from "../assets/starChecked.png";
import downloadIcon from "../assets/download.png";
import binIcon from "../assets/bin.png";
import Api from "../services/user";
import MyButton from "../UI/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_DIR } from "../reducers/fileReducer";
import Modal from "../UI/modal/modal";

const TableElement = ({ file }) => {
  const dispatch = useDispatch();
  const pathId = useSelector((x) => x.files.currentDirPathId);
  const pathName = useSelector((x) => x.files.currentDirPathName);

  const [checked, setChecked] = useState(file.starred);
  const [canClick, setCanClick] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);

  let accessString = "Private";
  if (file.isprivate === false) {
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
          id: `${pathId}${file.id}\\`,
          name: `${pathName}${file.name}\\`,
        },
      });
  }

  function downloadHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    Api.DownloadFile(pathName, file.name);
  }

  async function deleteHandler(e) {
    setModalVisible(false);
    e.preventDefault();
    e.stopPropagation();
    (await Api.DeleteFile(pathName + file.name, file.id, file.size))(dispatch);
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
      <div className="table-utils">
        {file.type !== "dir" && (
          <MyButton>
            <img
              src={downloadIcon}
              onClick={downloadHandler}
              className="icons"
              alt="download"
            />
          </MyButton>
        )}
        <MyButton
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <img src={binIcon} className="icons" alt="download" />
        </MyButton>
      </div>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <p style={{ fontSize: 16 }}>Delete file?</p>
        <p style={{ fontSize: 14 }}>
          Are you sure you want to delete {file.name}
        </p>
        <div
          style={{
            display: "flex",
            columnGap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              flex: 1,
              border: "none",
              padding: "5px 15px",
              cursor: "pointer",
            }}
            onClick={() => {
              setModalVisible(false);
            }}
          >
            NO
          </button>
          <button
            style={{
              flex: 1,
              border: "none",
              padding: "5px 15px",
              backgroundColor: "#039dfc",
              cursor: "pointer",
            }}
            onClick={deleteHandler}
          >
            YES
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TableElement;

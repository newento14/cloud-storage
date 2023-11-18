import React from "react";
import Api from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import uploadIcon from "../assets/upload.png";
import cl from "./uploadButton.module.css";

const UploadButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((x) => x.auth.user);
  const pathId = useSelector((x) => x.files.currentDirPathId);
  const pathName = useSelector((x) => x.files.currentDirPathName);

  function uploadFile(e) {
    const files = [...e.target.files];
    files.map((x) => {
      Api.UploadFile(
        x,
        pathId,
        pathName,
        user.storageSize,
        user.storageUsed
      )(dispatch);
    });
  }

  return (
    <div className={cl.upload}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={uploadIcon} className={cl.uploadIcon} />
        <label htmlFor="popa" className={cl.uploadLabel}>
          Upload
        </label>
      </div>
      <input
        multiple={true}
        onChange={(e) => uploadFile(e)}
        type="file"
        id="popa"
        className={cl.uploadInput}
      />
    </div>
  );
};

export default UploadButton;

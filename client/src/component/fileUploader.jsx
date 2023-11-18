import React from "react";
import cl from "./fileUploader.module.css";
import arrowUp from "../assets/arrowUp.png";
import arrowDown from "../assets/arrowDown.png";
import closeIcon from "../assets/close.png";
import fileIcon from "../assets/file.png";
import ProgressBar from "../UI/progressBar/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_VISIBLE } from "../reducers/uploadReducer";

const FIleUploader = () => {
  const dispatch = useDispatch();
  const files = useSelector((x) => x.upload.files);
  const visible = useSelector((x) => x.upload.isVisible);

  console.log(visible);

  const classes =
    visible === 0
      ? [cl.uploader]
      : visible === 1
      ? [cl.uploader, cl.visible]
      : [cl.uploader, cl.visible, cl.hide];

  return (
    <div className={classes.join(" ")}>
      <div className={cl.header}>
        {files.length} Files left
        <div style={{ display: "flex", columnGap: 10 }}>
          <button
            className={cl.btn}
            onClick={() => {
              dispatch({
                type: SET_IS_VISIBLE,
                payload: { isVisible: visible === 1 ? 2 : 1 },
              });
            }}
          >
            <img
              src={classes.length === 3 ? arrowDown : arrowUp}
              alt=""
              className="icons"
            />
          </button>
          <button
            className={cl.btn}
            onClick={() =>
              dispatch({ type: SET_IS_VISIBLE, payload: { isVisible: 0 } })
            }
          >
            <img src={closeIcon} alt="" className="icons" />
          </button>
        </div>
      </div>
      <div className={cl.content}>
        {files.map((x) => (
          <div key={x.id}>
            <div className={cl.name}>
              <img src={fileIcon} alt="" />
              <div className={cl.box}>
                <p
                  style={{
                    fontSize: 14,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                  className={cl.text}
                >
                  {x.name}
                </p>
              </div>
            </div>
            <ProgressBar bgcolor={"#32a84e"} completed={x.progress} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FIleUploader;

import React, { useState, useEffect, useMemo } from "react";
import BackIcon from "../icons/back.png";
import MyButton from "../UI/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILES, SET_CURRENT_DIR } from "../reducers/fileReducer";
import cl from "./home.module.css";
import Api from "../api/user";
import PopUp from "../component/popUp";
import Table from "../component/table";
import UploadButton from "../component/uploadButton";

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((x) => x.auth.isAuth);
  const user = useSelector((x) => x.auth.user);
  const files = useSelector((x) => x.files.files);
  const currentDirPathId = useSelector((x) => x.files.currentDirPathId);
  const currentDirPathName = useSelector((x) => x.files.currentDirPathName);

  const [modalVisible, setModalVisible] = useState(false);

  function backButton() {
    if (currentDirPathId !== "") {
      let resId = "";
      let resName = "";
      for (let i = currentDirPathId.length - 2; i >= 0; --i) {
        if (currentDirPathId[i] === "\\") {
          resId = currentDirPathId.substring(0, i + 1);
          break;
        }
      }

      for (let i = currentDirPathName.length - 2; i >= 0; --i) {
        if (currentDirPathName[i] === "\\") {
          resName = currentDirPathName.substring(0, i + 1);
          break;
        }
      }
      dispatch({
        type: SET_CURRENT_DIR,
        payload: { id: resId, name: resName },
      });
    }
  }

  async function getFiles() {
    dispatch({
      type: SET_FILES,
      payload: await Api.GetFiles({
        pathId: `${user.id}\\${currentDirPathId}`,
        pathName:
          currentDirPathName !== ""
            ? `${user.id}\\${currentDirPathName}`
            : `${user.id}`,
      }),
    });
  }

  useEffect(() => {
    if (isAuth === true) {
      getFiles();
    }
  }, [isAuth, currentDirPathId]);

  console.log("home render");
  return (
    <div>
      {isAuth && (
        <div className={cl.topDiv}>
          <p>Cloud Storage</p>
          <div className={cl.buttons}>
            <MyButton onClick={backButton}>
              <img src={BackIcon} alt="back" className={cl.backIcon} />
              Back
            </MyButton>
            <UploadButton type="file" />
            <MyButton
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Create
            </MyButton>
            <PopUp visible={modalVisible} setVisible={setModalVisible} />
          </div>
          <div className={cl.drapAndDrop}>
            <div>
              <p>Drop file here, or click Upload</p>
            </div>
          </div>
          <hr className={cl.horizontalSplitter} />
          <div className="path">
            <p>\{currentDirPathName}</p>
          </div>
          <Table files={files} />
        </div>
      )}
    </div>
  );
};

export default Home;

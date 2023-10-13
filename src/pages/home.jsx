import React, { useState, useEffect } from "react";
import BackIcon from "../assets/back.png";
import MyButton from "../UI/button/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_DIR } from "../reducers/fileReducer";
import cl from "./home.module.css";
import Api from "../services/user";
import PopUp from "../component/popUp";
import Table from "../component/table";
import UploadButton from "../component/uploadButton";
import FIleUploader from "../component/fileUploader";
import { SET_UPLOAD_FILES, SET_IS_VISIBLE } from "../reducers/uploadReducer";

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((x) => x.auth.isAuth);
  const user = useSelector((x) => x.auth.user);
  const files = useSelector((x) => x.files.files);
  const pathId = useSelector((x) => x.files.currentDirPathId);
  const pathName = useSelector((x) => x.files.currentDirPathName);

  const [modalVisible, setModalVisible] = useState(false);

  function backButton() {
    if (pathId !== "") {
      let resId = "";
      let resName = "";
      for (let i = pathId.length - 2; i >= 0; --i) {
        if (pathId[i] === "\\") {
          resId = pathId.substring(0, i + 1);
          break;
        }
      }

      for (let i = pathName.length - 2; i >= 0; --i) {
        if (pathName[i] === "\\") {
          resName = pathName.substring(0, i + 1);
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
    (
      await Api.GetFiles({
        pathId: `${user.id}\\${pathId}`,
        pathName: pathName !== "" ? `${user.id}\\${pathName}` : `${user.id}`,
      })
    )(dispatch);
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const files = [...event.dataTransfer.files];
    console.log(files[0]);
    const newFiles = files.map((file, index) => ({
      id: index + 1,
      progress: 0,
      name: file.name,
    }));
    console.log(newFiles);
    dispatch({ type: SET_IS_VISIBLE, payload: { isVisible: 1 } });
    dispatch({
      type: SET_UPLOAD_FILES,
      payload: { files: newFiles },
    });

    files.map((x, index) => {
      Api.UploadFile(
        x,
        pathId,
        pathName,
        user.storageSize,
        user.storageUsed,
        newFiles[index].id
      )(dispatch);
    });
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  useEffect(() => {
    if (isAuth === true) {
      getFiles();
    }
  }, [isAuth, pathId]);

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
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={cl.drapAndDrop}
          >
            <div>
              <p>Drop file here, or click Upload</p>
            </div>
          </div>
          <hr className={cl.horizontalSplitter} />
          <div className="path">
            <p>\{pathName}</p>
          </div>
          <Table files={files} />
          <FIleUploader />
        </div>
      )}
    </div>
  );
};

export default Home;

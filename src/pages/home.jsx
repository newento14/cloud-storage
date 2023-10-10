import React, { useState, useEffect } from "react";
import BackIcon from "../icons/back.png";
import MyButton from "../UI/button/MyButton";
import { useSelector } from "react-redux";
import cl from "./home.module.css";
import Api from "../Api/user";
import Modal from "../UI/modal/modal";
import MyInput from "../UI/input/MyInput";
import Table from "../component/table";

const Home = () => {
  const isAuth = useSelector((x) => x.isAuth);
  const user = useSelector((x) => x.user);
  const [fileRequest, setFileRequest] = useState({
    path: `${user.id}`,
    folderId: -1,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [files, setFiles] = useState([{}]);
  async function getFiles() {
    setFiles(await Api.GetFilesByUserid());
  }

  useEffect(() => {
    if (isAuth === true) {
      getFiles();
    }
  }, [isAuth]);

  async function createFolder() {
    setModalVisible(false);
    const responce = await Api.CreateFolder(
      `${fileRequest.path}\\${folderName}`
    );
    if (responce !== false) {
      setFiles([...files, responce]);
    }
    setFolderName("");
  }

  return (
    <div>
      {isAuth && (
        <div className={cl.topDiv}>
          <p>Cloud Storage</p>
          <div className={cl.buttons}>
            <MyButton>
              <img src={BackIcon} alt="back" className={cl.backIcon} />
              Back
            </MyButton>
            <MyButton>Upload</MyButton>
            <MyButton
              onClick={() => {
                setModalVisible(true);
              }}
            >
              Create
            </MyButton>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
              <MyInput
                placeholder="name"
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
              />
              <MyButton onClick={createFolder}>Create</MyButton>
            </Modal>
          </div>
          <div className={cl.drapAndDrop}>
            <div>
              <p>Drop file here, or click Upload</p>
            </div>
          </div>
          <hr className={cl.horizontalSplitter} />
          <Table files={files} />
        </div>
      )}
    </div>
  );
};

export default Home;

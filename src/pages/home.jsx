import React, { useState } from "react";
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
  const path = `${user.id}`;

  const [modalVisible, setModalVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  function createFolder() {
    setModalVisible(false);
    if (Api.CreateFolder(`${path}\\${folderName}`)) {
      //add folder to items list
    }
    setFolderName("");
  }

  return (
    <div>
      {isAuth && (
        <div className={cl.topDiv}>
          <p>Cloud Storage</p>
          <div className={cl.buttons}>
            <MyButton>Back</MyButton>
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
          <Table />
        </div>
      )}
    </div>
  );
};

export default Home;

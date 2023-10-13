import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/modal/modal";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import Api from "../services/user";

const PopUp = ({ visible, setVisible }) => {
  const [folderName, setFolderName] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((x) => x.auth.user);
  const currentDirPathId = useSelector((x) => x.files.currentDirPathId);
  const currentDirPathName = useSelector((x) => x.files.currentDirPathName);

  async function createFolder() {
    setVisible(false);
    (
      await Api.CreateFolder({
        pathId: `${user.id}\\${currentDirPathId}`,
        pathName:
          currentDirPathName !== ""
            ? `${user.id}\\${currentDirPathName}\\${folderName}`
            : `${user.id}\\${folderName}`,
      })
    )(dispatch);
    setFolderName("");
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <MyInput
        placeholder="name"
        value={folderName}
        onChange={(e) => {
          setFolderName(e.target.value);
        }}
      />
      <MyButton onClick={createFolder}>Create</MyButton>
    </Modal>
  );
};

export default PopUp;

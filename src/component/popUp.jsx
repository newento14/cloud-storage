import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILES } from "../reducers/fileReducer";
import Modal from "../UI/modal/modal";
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import Api from "../api/user";

const PopUp = ({ visible, setVisible }) => {
  const [folderName, setFolderName] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((x) => x.auth.user);
  const files = useSelector((x) => x.files.files);
  const currentDirPathId = useSelector((x) => x.files.currentDirPathId);
  const currentDirPathName = useSelector((x) => x.files.currentDirPathName);

  async function createFolder() {
    setVisible(false);
    const responce = await Api.CreateFolder({
      pathId: `${user.id}\\${currentDirPathId}`,
      pathName:
        currentDirPathName !== ""
          ? `${user.id}\\${currentDirPathName}\\${folderName}`
          : `${user.id}\\${folderName}`,
    });
    if (responce !== false) {
      dispatch({ type: SET_FILES, payload: [...files, responce] });
    }
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

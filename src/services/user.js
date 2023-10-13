import axios from "axios";
import { LOGOUT, SET, ADD_STORAGE_USED } from "../reducers/authReducer";
import { ADD_FILE, SET_FILES, DELETE_FILE } from "../reducers/fileReducer";
import { CHANGE_PROGRESS, DELETE_UPLOAD_FILE } from "../reducers/uploadReducer";

export default class Api {
  static async Registration(form) {
    try {
      await axios.post("https://localhost:7189/api/auth/registration", form);
    } catch (e) {
      alert(e);
    }
  }

  static Login(form) {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          "https://localhost:7189/api/auth/login",
          form
        );
        dispatch({ type: SET, payload: { user: response.data.user } });
        localStorage.setItem("token", response.data.token);
      } catch (e) {
        dispatch({ type: LOGOUT });
      }
    };
  }

  static Auth() {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          "https://localhost:7189/api/auth/validate",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({ type: SET, payload: { user: response.data.user } });
        localStorage.setItem("token", response.data.token);
      } catch (e) {
        dispatch({ type: LOGOUT });
      }
    };
  }

  static async CreateFolder(path) {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          "https://localhost:7189/api/files/folder",
          path,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({ type: ADD_FILE, payload: { file: response.data } });
      } catch (e) {
        alert(e);
      }
    };
  }

  static async GetFiles(path) {
    return async (dispatch) => {
      try {
        const response = await axios.post(
          "https://localhost:7189/api/files/getFiles",
          path,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({ type: SET_FILES, payload: { files: response.data } });
      } catch (e) {
        alert(e);
      }
    };
  }

  static async SetStarred(id, state) {
    try {
      await axios.post(
        "https://localhost:7189/api/files/setStarred",
        { id: id, state: state },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
      alert(e);
    }
  }

  static UploadFile(file, pathId, pathName, storageSize, storageUsed, id) {
    return async (dispatch) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pathId", pathId);
        formData.append("pathName", pathName);
        formData.append("storageSize", storageSize);
        formData.append("storageUsed", storageUsed);

        const response = await axios.post(
          `https://localhost:7189/api/files/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            onUploadProgress: (event) => {
              dispatch({
                type: CHANGE_PROGRESS,
                payload: {
                  id: id,
                  progress: Math.round(
                    Math.round(100 * event.loaded) / event.total
                  ),
                },
              });
            },
          }
        );
        dispatch({ type: ADD_FILE, payload: { file: response.data } });
        dispatch({ type: DELETE_UPLOAD_FILE, payload: { id: id } });
        dispatch({
          type: ADD_STORAGE_USED,
          payload: { size: response.data.size },
        });
      } catch (e) {}
    };
  }

  static async DownloadFile(path, fileName) {
    const response = await fetch(
      `https://localhost:7189/api/files/download?path=${path}${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  static DeleteFile(path, id, size) {
    return async (dispatch) => {
      try {
        await axios.delete(
          `https://localhost:7189/api/files/delete?path=${path}&id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({ type: DELETE_FILE, payload: { id: id } });
        dispatch({ type: ADD_STORAGE_USED, payload: { size: size * -1 } });
      } catch (e) {
        alert(e);
      }
    };
  }
}

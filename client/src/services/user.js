import {ADD_STORAGE_USED, LOGOUT, SET, SET_IS_LOADING} from "../reducers/authReducer";
import {ADD_FILE, DELETE_FILE, SET_FILES} from "../reducers/fileReducer";
import {CHANGE_PROGRESS, DELETE_UPLOAD_FILE} from "../reducers/uploadReducer";
import $axios from "../api";

const baseUrl = process.env.REACT_APP_SERVER_URL;

export default class Api {
  static async Registration(form) {
    try {
      await $axios.post("/api/auth/registration", form);
    } catch (e) {
      alert(e);
    }
  }

  static Login(form) {
    return async (dispatch) => {
      try {
        const response = await $axios.post(
          "/api/auth/login",
          form
        );
        dispatch({type: SET, payload: {user: response.data.user}});
        localStorage.setItem("token", response.data.token);
      } catch (e) {
        alert(e)
        dispatch({type: LOGOUT});
      }
    };
  }

  static Auth() {
    return async (dispatch) => {
      dispatch({type: SET_IS_LOADING, payload: true})
      try {
        const response = await $axios.post(
          "/api/auth/refresh"
        );
        console.log(response)
        dispatch({type: SET, payload: {user: response.data.user}});
        localStorage.setItem("token", response.data.token);
      } catch (e) {
        dispatch({type: LOGOUT});
      } finally {
        dispatch({type: SET_IS_LOADING, payload: false})
      }
    };
  }

  static async CreateFolder(path) {
    return async (dispatch) => {
      try {
        const response = await $axios.post(
          "/api/files/folder",
          path,
        );
        dispatch({type: ADD_FILE, payload: {file: response.data}});
      } catch (e) {
        alert(e);
      }
    };
  }

  static async GetFiles(path) {
    return async (dispatch) => {
      try {
        const response = await $axios.post(
          "/api/files",
          path,
        );
        dispatch({type: SET_FILES, payload: {files: response.data}});
      } catch (e) {
        alert(e);
      }
    };
  }

  static async SetStarred(id, state) {
    try {
      await $axios.post(
        "/api/files/setStarred",
        {id: id, state: state},
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

        const response = await $axios.post(
          `/api/files/upload`,
          formData,
          {
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
        dispatch({type: ADD_FILE, payload: {file: response.data}});
        dispatch({type: DELETE_UPLOAD_FILE, payload: {id: id}});
        dispatch({
          type: ADD_STORAGE_USED,
          payload: {size: Number(response.data.size)},
        });
      } catch (e) {
      }
    };
  }

  static async DownloadFile(path, fileName) {
    const response = await fetch(
      baseUrl + `/api/files/download?path=${path}${fileName}`,
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
        await $axios.delete(
          `/api/files?path=${path}&id=${id}`,
        );
        dispatch({type: DELETE_FILE, payload: {id: id}});
        dispatch({type: ADD_STORAGE_USED, payload: {size: size * -1}});
      } catch (e) {
        alert(e);
      }
    };
  }
}

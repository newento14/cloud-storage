import axios from "axios";
import { LOGOUT, SET, ADD_STORAGE_USED } from "../reducers/authReducer";
import { ADD_FILE } from "../reducers/fileReducer";

export default class Api {
  static async Registration(form) {
    try {
      const response = await axios.post(
        "https://localhost:7189/api/auth/registration",
        form
      );
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
        dispatch({ type: SET, user: response.data.user });
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
        dispatch({ type: SET, user: response.data.user });
        localStorage.setItem("token", response.data.token);
      } catch (e) {
        dispatch({ type: LOGOUT });
      }
    };
  }

  static async CreateFolder(path) {
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
      return response.data;
    } catch (e) {
      alert(e);
    }
  }

  static async GetFiles(path) {
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
      return response.data;
    } catch (e) {
      alert(e);
    }
  }

  static async GetFilesByUserid() {
    try {
      const response = await axios.get(
        "https://localhost:7189/api/files/getFiles",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      alert(e);
    }
  }

  static async SetStarred(id, state) {
    try {
      const response = await axios.post(
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

  static UploadFile(file, pathId, pathName, storageSize, storageUsed) {
    return async (dispatch) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pathId", pathId);
        formData.append("pathName", pathName);
        formData.append("storageSize", storageSize);
        formData.append("storageUsed", storageUsed);
        for (const value of formData.values()) {
          console.log(value);
        }
        const response = await axios.post(
          `https://localhost:7189/api/files/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            // onUploadProgress: (progressEvent) => {
            //   const totalLength = progressEvent.lengthComputable
            //     ? progressEvent.total
            //     : progressEvent.target.getResponseHeader("content-length") ||
            //       progressEvent.target.getResponseHeader(
            //         "x-decompressed-content-length"
            //       );
            //   console.log("total", totalLength);
            //   if (totalLength) {
            //     let progress = Math.round(
            //       (progressEvent.loaded * 100) / totalLength
            //     );
            //     console.log(progress);
            //   }
            // },
          }
        );
        dispatch({ type: ADD_FILE, payload: { file: response.data } });
        dispatch({ type: ADD_STORAGE_USED, size: response.data.size });
      } catch (e) {}
    };
  }
}

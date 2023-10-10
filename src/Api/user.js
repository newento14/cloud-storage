import axios from "axios";
import { LOGOUT, SET } from "../reducers/authReducer";

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
        { path: `${path}` },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return false;
    }
  }

  static async GetFiles(path) {
    try {
      const response = await axios.get(
        "https://localhost:7189/api/files/getFiles",
        path,
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
    } catch (e) {}
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
    } catch (e) {}
  }
}

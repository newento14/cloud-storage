import { combineReducers } from "redux";
import auth from "./authReducer";
import files from "./fileReducer";
import upload from "./uploadReducer";

export default combineReducers({
  auth,
  files,
  upload,
});

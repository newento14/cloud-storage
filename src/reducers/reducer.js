import { combineReducers } from "redux";
import auth from "./authReducer";
import files from "./fileReducer";

export default combineReducers({
  auth,
  files,
});

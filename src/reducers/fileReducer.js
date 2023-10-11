export const SET_FILES = "SET_FILES";
export const SET_CURRENT_DIR = "SET_CURRENT_DIR";
export const ADD_FILE = "ADD_FILE";

const defaultState = {
  files: [],
  currentDirPathId: "",
  currentDirPathName: "",
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDirPathId: action.payload.id,
        currentDirPathName: action.payload.name,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload.file],
      };
    default:
      return state;
  }
}

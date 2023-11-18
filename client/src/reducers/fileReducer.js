export const SET_FILES = "SET_FILES";
export const SET_CURRENT_DIR = "SET_CURRENT_DIR";
export const ADD_FILE = "ADD_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";

const defaultState = {
  files: [],
  currentDirPathId: "",
  currentDirPathName: "",
  uploadProgress: 0,
  searchQuery: "",
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload.files,
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

    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((x) => x.id !== action.payload.id)],
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    default:
      return state;
  }
}

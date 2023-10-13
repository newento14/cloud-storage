export const SET_UPLOAD_FILES = "SET_UPLOAD_FILES";
export const SET_IS_VISIBLE = "SET_IS_VISIBLE";
export const ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE";
export const DELETE_UPLOAD_FILE = "DELETE_UPLOAD_FILE";
export const CHANGE_PROGRESS = "CHANGE_PROGRESS";

const defaultState = {
  isVisible: 0,
  files: [],
};

export default function fileReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_UPLOAD_FILES:
      return {
        ...state,
        files: action.payload.files,
      };
    case ADD_UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload.file],
      };
    case DELETE_UPLOAD_FILE:
      return {
        ...state,
        files: state.files.filter((x) => x.id !== action.payload.id),
      };
    case SET_IS_VISIBLE:
      console.log(action.payload);
      return {
        ...state,
        isVisible: action.payload.isVisible,
      };
    case CHANGE_PROGRESS:
      return {
        ...state,
        files: state.files.map((x) =>
          x.id === action.payload.id
            ? { ...x, progress: action.payload.progress }
            : { ...x }
        ),
      };
    default:
      return state;
  }
}

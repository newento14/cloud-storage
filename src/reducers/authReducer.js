export const SET = "SET";
export const LOGOUT = "LOGOUT";
export const ADD_STORAGE_USED = "ADD_STORAGE_USED";

const defaultState = {
  isAuth: false,
  user: {},
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        isAuth: true,
        user: action.user,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
        user: [],
      };

    case ADD_STORAGE_USED:
      return {
        ...state,
        user: {
          ...state.user,
          storageUsed: state.user.storageUsed + action.size,
        },
      };

    default:
      return state;
  }
};

export default authReducer;

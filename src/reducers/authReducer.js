export const SET = "SET";
export const LOGOUT = "LOGOUT";

const defaultState = {
  isAuth: false,
  user: {},
};

const reducer = (state = defaultState, action) => {
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

    default:
      return state;
  }
};

export default reducer;

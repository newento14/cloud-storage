export const SET = "SET";
export const LOGOUT = "LOGOUT";
export const ADD_STORAGE_USED = "ADD_STORAGE_USED";
export const SET_IS_LOADING = 'SET_IS_LOADING';

const defaultState = {
    isAuth: false,
    user: {},
    isLoading: false
};

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
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
                    storageUsed: Number(state.user.storageUsed) + Number(action.payload.size),
                },
            };
        case SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default:
            return state;
    }
};

export default authReducer;

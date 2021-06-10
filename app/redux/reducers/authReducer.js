import {
  REGISTER,
  LOGIN,
  SET_HOSPITAL_DATA,
  SET_USER,
  SET_USER_TYPE,
  SET_ISLOADING,
  SET_ERROR,
  UPLOAD_AVATAR,
  RESET_USER,
} from "../constants";

const initialState = {
  isLoading: false,
  userType: "",
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return state;
    }

    case REGISTER: {
      return state;
    }

    case SET_USER_TYPE: {
      return {
        ...state,
        userType: action.payload,
      };
    }

    case SET_USER: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }

    case UPLOAD_AVATAR: {
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    }

    case SET_HOSPITAL_DATA: {
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          hospital: action.payload,
        },
        error: null,
      };
    }

    case SET_ISLOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case RESET_USER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

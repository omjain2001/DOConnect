import {
  ADD_HOSPITALS,
  SET_HOSPITALS,
  SET_CAN_LOAD_MORE,
  SET_IS_MORE_LOADING,
  SET_CURRENT_HOSPITAL,
} from "../constants";

const initialState = {
  data: [],
  currentHospital: null,
  lastVisibleHospital: null,
  canLoadMore: false,
  isMoreLoading: false,
};

export const hospitalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOSPITALS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ADD_HOSPITALS: {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        lastVisibleHospital: action.payload.lastVisibleHospital,
      };
    }

    case SET_CURRENT_HOSPITAL: {
      // console.log(
      //   {
      //     ...state,
      //     currentHospital: action.payload,
      //   },
      //   "STATE"
      // );
      return {
        ...state,
        currentHospital: action.payload,
      };
    }

    case SET_CAN_LOAD_MORE: {
      return {
        ...state,
        canLoadMore: action.payload,
      };
    }

    case SET_IS_MORE_LOADING: {
      return {
        ...state,
        isMoreLoading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

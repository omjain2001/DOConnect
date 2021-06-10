import {
  ADD_HOSPITALS,
  SET_HOSPITALS,
  SET_CAN_LOAD_MORE,
  SET_IS_MORE_LOADING,
} from "../constants";

const initialState = {
  data: [],
  lastVisibleHospital: null,
  canLoadMore: true,
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
      return initialState;
    }
  }
};

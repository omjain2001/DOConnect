import { SET_APPOINTMENTS, SET_PATIENTS_IN_QUEUE } from "../constants";

const initialState = {
  data: [],
  patientsInQueue: 0,
};

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPOINTMENTS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case SET_PATIENTS_IN_QUEUE: {
      return {
        ...state,
        patientsInQueue: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

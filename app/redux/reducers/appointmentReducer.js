import {
  SET_APPOINTMENTS,
  SET_APPOINTMENT_STATUS,
  SET_PATIENTS_IN_QUEUE,
} from "../constants";

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

    case SET_APPOINTMENT_STATUS: {
      return {
        ...state,
        data: state.data.map((appointment) => {
          if (appointment.id === action.payload.appointmentId) {
            return {
              ...appointment,
              status: action.payload.status,
            };
          }
          return appointment;
        }),
      };
    }

    default: {
      return state;
    }
  }
};

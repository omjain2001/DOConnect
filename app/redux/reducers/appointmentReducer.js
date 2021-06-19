import {
  ADD_APPOINTMENTS,
  SET_APPOINTMENTS,
  SET_APPOINTMENT_STATUS,
  SET_PATIENTS_IN_QUEUE,
  SET_TODAYS_APPOINTMENTS,
} from "../constants";

const initialState = {
  data: [],
  queue: 0,
  examined: 0,
  total: 0,
};

export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_APPOINTMENTS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case ADD_APPOINTMENTS: {
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    }

    case SET_PATIENTS_IN_QUEUE: {
      return {
        ...state,
        queue: action.payload,
        examined: state.total - action.payload,
      };
    }

    case SET_TODAYS_APPOINTMENTS: {
      return {
        ...state,
        total: action.payload,
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

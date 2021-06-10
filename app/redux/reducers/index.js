import { combineReducers } from "redux";
import { appointmentReducer } from "./appointmentReducer";
import { authReducer } from "./authReducer";
import { hospitalReducer } from "./hospitalReducer";

const reducers = combineReducers({
  auth: authReducer,
  hospitals: hospitalReducer,
  appointments: appointmentReducer,
});

export default reducers;

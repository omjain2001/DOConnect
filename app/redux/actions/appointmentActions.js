import {
  COLLECTION,
  SET_APPOINTMENTS,
  SET_PATIENTS_IN_QUEUE,
  USER_TYPE,
} from "../constants";
import { firestore } from "../../auth/firebase";

export const fetchAppointments = (id) => async (dispatch, getState) => {
  const userType = getState().auth.userType;
  try {
    if (userType === USER_TYPE.PATIENT) {
      const appointments = await firestore
        .collection(COLLECTION.APPOINTMENT)
        .where("patient_details.id", "==", id)
        .get();
      if (!appointments.empty) {
        let arr = [];
        appointments.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        dispatch({
          type: SET_APPOINTMENTS,
          payload: arr,
        });
      }
    } else {
      const appointments = await firestore
        .collection(COLLECTION.APPOINTMENT)
        .where("hospitalId", "==", id)
        .get();
      if (!appointments.empty) {
        let arr = [];
        appointments.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        dispatch({
          type: SET_APPOINTMENTS,
          payload: arr,
        });
      }

      dispatch(fetchPatientsInQueue(id));
    }
  } catch (error) {
    console.log(error.message);
  }
};

// TODO
// 1. Whenever patient clicks on the hospital details card, fetch patients in queue
// 2. Whenever patient books an appointment, appointment details will contain updated queue no.
// 3. Whenever doctor rejects or appointment is cancelled by the patient,
export const fetchPatientsInQueue = (hospitalId, date) => async (dispatch) => {
  try {
    const count = await firestore
      .collection(COLLECTION.APPOINTMENT)
      .where("hospitalId", "==", hospitalId)
      .where("status", "==", "pending")
      .where("appointment_date", "==", date)
      .get();
    if (!count.empty) {
      dispatch({
        type: SET_PATIENTS_IN_QUEUE,
        payload: count.docs.length,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const cancelAppointment =
  (appointmentId) => async (dispatch, getState) => {
    try {
      await firestore
        .collection(COLLECTION.APPOINTMENT)
        .doc(appointmentId)
        .delete();
      dispatch({
        type: SET_APPOINTMENTS,
        payload: getState().appointments.data.filter(
          (doc) => doc.id !== appointmentId
        ),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

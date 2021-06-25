import firebase from "firebase";
import { auth, firestore, storage } from "../../auth/firebase";
import {
  SET_USER,
  SET_USER_TYPE,
  SET_HOSPITAL_DATA,
  SET_ERROR,
  SET_ISLOADING,
  COLLECTION,
  USER_TYPE,
  RESET_USER,
} from "../constants";

// Fetching user details and hospital details (if user is doctor)
export const fetchUser = (email, userType) => async (dispatch) => {
  try {
    const getUser = await firestore
      .collection(
        userType.toLowerCase() === USER_TYPE.DOCTOR.toLowerCase()
          ? COLLECTION.DOCTOR
          : COLLECTION.PATIENT
      )
      .where("email", "==", email)
      .get();

    if (getUser.docs.length > 0) {
      const userData = getUser.docs[0].data();
      dispatch({
        type: SET_USER,
        payload: {
          ...userData,
          id: getUser.docs[0].id,
        },
      });

      if (userType.toLowerCase() === USER_TYPE.DOCTOR.toLowerCase()) {
        const hospitalData = await firestore
          .collection(COLLECTION.HOSPITAL)
          .doc(userData.hospitalRef)
          .get();
        if (hospitalData.exists) {
          dispatch({
            type: SET_HOSPITAL_DATA,
            payload: hospitalData.data(),
          });
        }
      }

      return new Promise((res) => {
        res({
          status: "success",
          message: "Data fetched successfully",
          data: getUser.docs[0].data(),
        });
      });
    } else {
      throw new Error("Invalid user or user type");
    }
  } catch (error) {
    return new Promise((res, rej) => {
      rej({
        status: "error",
        message: error.message,
      });
    });
  }
};

// Set or Update user in database and store
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    const { id, ...userData } = user;
    if (getState().auth.userType === USER_TYPE.DOCTOR) {
      await firestore.doc(`${COLLECTION.DOCTOR}/${id}`).update(userData);
    } else {
      await firestore.doc(`${COLLECTION.PATIENT}/${id}`).update(userData);
    }

    dispatch({
      type: SET_USER,
      payload: user,
    });

    return new Promise((res) =>
      res({
        status: "success",
        message: "Profile updated successfully",
      })
    );
  } catch (error) {
    dispatch({
      type: SET_ERROR,
      payload: error.message,
    });

    return new Promise((res) =>
      res({
        status: "error",
        message: error.message,
      })
    );
  }
};

// Set user type in store
export const setUserType = (type) => (dispatch, getState) => {
  dispatch({
    type: SET_USER_TYPE,
    payload: type,
  });
};

// Set user state in store
export const setUserState = (user) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

// Fetch hospital through UID
export const fetchHospitalData = (UID) => async (dispatch) => {
  try {
    dispatch({
      type: SET_ISLOADING,
      payload: true,
    });

    const getHospital = await firestore
      .collection("hospitals")
      .where("UID", "==", UID)
      .get();

    if (getHospital.size === 1) {
      getHospital.forEach((doc) => {
        dispatch({
          type: SET_HOSPITAL_DATA,
          payload: {
            id: doc.id,
            ...doc.data(),
          },
        });
      });

      return new Promise((res) =>
        res({
          status: "success",
          message: "Hospital details fetched successfully",
        })
      );
    } else {
      return new Promise((res, rej) =>
        rej({
          status: "error",
          message: "Hospital does not exist",
        })
      );
    }
  } catch (e) {
    return new Promise((res, rej) =>
      rej({
        status: "error",
        message: e.message,
      })
    );
  }
};

export const resetUser = () => (dispatch) => {
  dispatch({
    type: RESET_USER,
    payload: null,
  });
};

export const deleteUser = () => async(dispatch, getState) => {
  const userId = getState().auth.user.id;
  try {
    auth.currentUser.delete();

    if (getState().auth.userType === USER_TYPE.PATIENT) {
      await firestore.collection(COLLECTION.PATIENT).doc(userId).delete();
    } else {
      await firestore.collection(COLLECTION.DOCTOR).doc(userId).delete();
      await firestore
        .collection(COLLECTION.HOSPITAL)
        .doc(`${getState().auth.user.hospital.id}.doctorsRef`)
        .update({
          doctorsRef: firebase.firestore.FieldValue.arrayRemove(userId),
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};

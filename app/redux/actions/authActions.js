import { auth, firestore, storage } from "../../auth/firebase";
import {
  SET_USER,
  SET_USER_TYPE,
  SET_HOSPITAL_DATA,
  SET_ERROR,
  SET_ISLOADING,
  COLLECTION,
  USER_TYPE,
} from "../constants";

// Fetching user details and hospital details (if user is doctor)
export const fetchUser = (email, userType) => async (dispatch) => {
  try {
    dispatch({
      type: SET_ISLOADING,
      payload: true,
    });
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
      const profileImgUrl = "";

      // Already set during upload
      // if (userData.profileImg) {
      //   storage
      //     .ref(userData.profileImg)
      //     .getDownloadURL()
      //     .then((url) => {
      //       profileImgUrl = url;
      //     });
      // }

      dispatch({
        type: SET_USER,
        payload: {
          ...userData,
          profileImg: profileImgUrl,
        },
      });

      if (userType.toLowerCase() === USER_TYPE.DOCTOR.toLowerCase()) {
        const hospitalData = await firestore
          .collection(COLLECTION.HOSPITAL)
          .doc(getUser.docs[0].data().hospitalRef)
          .get();
        if (hospitalData.exists) {
          dispatch({
            type: SET_HOSPITAL_DATA,
            payload: hospitalData.data(),
          });
        }
      }

      dispatch({
        type: SET_ISLOADING,
        payload: false,
      });

      return new Promise((res) => {
        res({
          status: "success",
          message: "Data fetched successfully",
          data: getUser.docs[0].data(),
        });
      });
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

export const uploadAvatar = (uri) => async (dispatch) => {
  try {
    const imageRef = storage.ref(
      `${auth.currentUser.uid}/profile.${uri.split(".").pop()}`
    );
    const imageBlob = await (await fetch(uri)).blob();
    await imageRef.put(imageBlob);
    const avatarUrl = await imageRef.getDownloadURL();
    dispatch({
      type: UPLOAD_AVATAR,
      payload: avatarUrl,
    });

    return new Promise((res) =>
      res({
        status: "success",
        message: "Avatar uploaded successfully",
        data: avatarUrl,
      })
    );
  } catch (error) {}
};

// Set or Update user in database and store
export const setUser = (user) => async (dispatch) => {
  try {
    if (getState().auth.userType === USER_TYPE.DOCTOR) {
      await firestore
        .collection(COLLECTION.DOCTOR)
        .doc(getState().auth.user.id)
        .set(user, { merge: true });
    } else {
      console.log("Setting Patient");
      await firestore
        .collection(COLLECTION.PATIENT)
        .doc(getState().auth.user.id)
        .set(user, { merge: true });
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
      // dispatch({
      //   type: SET_ERROR,
      //   payload: "Hospital does not exist",
      // });
      return new Promise((res, rej) =>
        rej({
          status: "error",
          message: "Hospital does not exist",
        })
      );
    }
  } catch (e) {
    // dispatch({
    //   type: SET_ERROR,
    //   payload: e.message,
    // });

    return new Promise((res, rej) =>
      rej({
        status: "error",
        message: e.message,
      })
    );
  }
};

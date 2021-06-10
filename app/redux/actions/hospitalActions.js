import { firestore } from "../../auth/firebase";
import {
  ADD_HOSPITALS,
  COLLECTION,
  SET_CAN_LOAD_MORE,
  SET_HOSPITALS,
  SET_IS_MORE_LOADING,
} from "../constants";

export const fetchInitialHospitals = () => async (dispatch) => {
  try {
    const res = await firestore
      .collection(COLLECTION.HOSPITAL)
      .orderBy("hospitalName", "asc")
      .limit(7)
      .get();

    if (res.empty || res.docs.length < 7) {
      dispatch({
        type: SET_CAN_LOAD_MORE,
        payload: false,
      });
    } else {
      dispatch({
        type: SET_CAN_LOAD_MORE,
        payload: true,
      });
    }

    if (!res.empty) {
      let arr = [];
      res.docs.forEach((doc) => arr.push(doc.data()));
      dispatch({
        type: SET_HOSPITALS,
        payload: {
          data: arr,
          lastVisibleHospital: res.docs[res.docs.length - 1],
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMoreHospitals = () => async (dispatch, getState) => {
  try {
    const lastVisible = getState().hospitals.lastVisibleHospital;
    if (lastVisible) {
      dispatch({
        type: SET_IS_MORE_LOADING,
        payload: true,
      });

      const getMore = await firestore
        .collection(COLLECTION.HOSPITAL)
        .orderBy("hospitalName", "asc")
        .startAfter(lastVisible)
        .limit(7)
        .get();

      if (getMore.empty || getMore.docs.length < 7) {
        dispatch({
          type: SET_CAN_LOAD_MORE,
          payload: false,
        });
      }
      if (!getMore.empty) {
        let arr = [];
        getMore.docs.forEach((doc) => arr.push(doc.data()));
        dispatch({
          type: ADD_HOSPITALS,
          payload: {
            data: arr,
            lastVisibleHospital: getMore.docs[getMore.docs.length - 1],
          },
        });
      }

      dispatch({
        type: SET_IS_MORE_LOADING,
        payload: false,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const searchHospitals = (searchText) => async (dispatch) => {
  try {
    const allHospitals = await firestore
      .collection(COLLECTION.HOSPITAL)
      .orderBy("hospitalName", "asc")
      .get();

    let arr = [];
    allHospitals.docs.forEach((doc) => {
      const hospitalData = doc.data();
      if (
        hospitalData.hospitalName.toLowerCase().includes(searchText) ||
        hospitalData.address.toLowerCase().includes(searchText)
      ) {
        arr.push(hospitalData);
      }
    });

    dispatch({
      type: SET_HOSPITALS,
      payload: {
        data: arr,
        lastVisibleHospital: null,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

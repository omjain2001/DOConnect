import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./AuthNav";
import { LogBox } from "react-native";
import { auth, firestore } from "../auth/firebase";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/actions/authActions";
import { SET_USER_TYPE, USER_TYPE } from "../redux/constants";
import { fetchAppointments } from "../redux/actions/appointmentActions";
import { PatientNav } from "./PatientNav";
import CompleteProfileNavigator from "./CompleteProfileNavigator";
import { fetchInitialHospitals } from "../redux/actions/hospitalActions";

const Navigation = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`", "Setting a timer"]);
  }, []);

  const dispatch = useDispatch();
  const [profileComplete, setProfileComplete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const authUser = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          setLoggedIn(true);
          dispatch({
            type: SET_USER_TYPE,
            payload: USER_TYPE.PATIENT,
          });
          dispatch(fetchInitialHospitals());
          const getUser = await dispatch(
            fetchUser(user.email, USER_TYPE.PATIENT)
          );
          if (getUser) {
            setProfileComplete(getUser.data.isProfileSet);
          }
          dispatch(fetchAppointments(getUser.data.id, USER_TYPE.PATIENT));
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    });

    return () => authUser();
  }, []);

  return (
    <NavigationContainer>
      {loggedIn ? (
        profileComplete ? (
          <PatientNav />
        ) : (
          <CompleteProfileNavigator />
        )
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};

export default Navigation;

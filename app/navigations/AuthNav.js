import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DoctorPatientScreen from "../screens/DoctorPatientScreen";
import RegisterPatientScreen from "../screens/RegisterPatientScreen";
import RegisterDoctorScreen from "../screens/RegisterDoctorScreen";
import DoctorRegistrationNav from "../navigations/DoctorRegistrationNav";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import AuthenticateUIDScreen from "../screens/AuthenticateUIDScreen";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";
import PatientDashboard from "../screens/PatientDashboard";
import DoctorProfile from "../screens/DoctorProfile";
import RegisterScreen from "../screens/RegisterScreen";
import VerifyHospitalScreen from "../screens/VerifyHospitalScreen";
import VerifyHospitalDetails from "../screens/ViewHospitalDetails";
const Stack = createStackNavigator();

const AuthNav = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DoctorPatientScreen"
      component={DoctorPatientScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DoctorProfile"
      component={DoctorProfile}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VerifyHospitalDetails"
      component={VerifyHospitalDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="doctorRegistration"
      component={DoctorRegistrationNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="patientRegistration"
      component={RegisterPatientScreen}
      options={{ headerShown: false }}
    />
    {/* {() => <PersonalDetailsScreen type="patient" />} */}
    <Stack.Screen
      name="RegisterDoctorScreen"
      component={RegisterDoctorScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterPatientScreen"
      component={RegisterPatientScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PersonalDetailsScreen"
      component={PersonalDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AuthenticateUIDScreen"
      component={AuthenticateUIDScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="BookAppointmentScreen"
      component={BookAppointmentScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PatientDashboard"
      component={PatientDashboard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="VerifyHospitalScreen"
      component={VerifyHospitalScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNav;

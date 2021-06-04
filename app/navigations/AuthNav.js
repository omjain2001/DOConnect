import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DoctorPatientScreen from "../screens/DoctorPatientScreen";
import RegisterPatientScreen from "../screens/RegisterPatientScreen";
import RegisterDoctorScreen from "../screens/RegisterDoctorScreen";
import DoctorRegistrationNav from "../navigations/DoctorRegistrationNav";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import PatientRegistrationNav from "./PatientRegistrationNav";

const Stack = createStackNavigator();

const AuthNav = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="DoctorPatientScreen" component={DoctorPatientScreen} />
    <Stack.Screen
      name="doctorRegistration"
      component={DoctorRegistrationNav}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="patientRegistration"
      component={PatientRegistrationNav}
      // component={<PersonalDetailsScreen type="patient" />}
      options={{ headerShown: false }}
    />
    {/* <Stack.Screen name="RegisterDoctorScreen" component={RegisterDoctorScreen} />
    <Stack.Screen name="RegisterPatientScreen" component={RegisterPatientScreen} /> */}
  </Stack.Navigator>
);

export default AuthNav;

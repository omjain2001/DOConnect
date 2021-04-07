import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterPatientScreen from "../screens/RegisterScreen";
import RegisterDoctorScreen from '../screens/DoctorPatientScreen';
import BookAppointmentScreen from '../screens/BookAppointmentScreen'; 

const Stack = createStackNavigator();

const AuthNav = () => (
  <Stack.Navigator initialRouteName="HospitalDetailsScreen">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="RegisterDoctorScreen" component={RegisterDoctorScreen} />
    <Stack.Screen name="RegisterPatientScreen" component={RegisterPatientScreen} />
    <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen} />
  </Stack.Navigator>
);

export default AuthNav;

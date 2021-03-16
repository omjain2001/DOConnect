import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import DoctorPatientScreen from "../screens/DoctorPatientScreen";
import RegisterPatientScreen from "../screens/RegisterPatientScreen";
import RegisterDoctorScreen from '../screens/RegisterDoctorScreen';

const Stack = createStackNavigator();

const AuthNav = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="DoctorPatientScreen" component={DoctorPatientScreen} />
    <Stack.Screen name="RegisterDoctorScreen" component={RegisterDoctorScreen} />
    <Stack.Screen name="RegisterPatientScreen" component={RegisterPatientScreen} />
  </Stack.Navigator>
);

export default AuthNav;

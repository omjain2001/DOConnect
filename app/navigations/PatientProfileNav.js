import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PatientDashboard from "../screens/PatientDashboard";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";
import AppointmentHistory from "../screens/AppointmentHistory";
import SearchScreen from "../screens/SearchScreen";

export const PatientProfileNav=()=> {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen name="Dashboard" component={PatientDashboard} />
      <Screen name="Profile" component={PersonalDetailsScreen} />
      <Screen name="Search" component={SearchScreen}/>
    </Navigator>
  );
}

export const BookAppointmentNav=()=> {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen name="Book" component={BookAppointmentScreen} />
    </Navigator>
  );
}

export const AppointmentHistoryNav=()=>{
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen name="Appointments" component={AppointmentHistory} />
    </Navigator>
  );
}

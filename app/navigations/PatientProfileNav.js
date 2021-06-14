import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabBar, Tab, Text } from '@ui-kitten/components';
import PatientDashboard from "../screens/PatientDashboard";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";
import {CompletedAppointments, PendingAppointments} from "../screens/AppointmentHistory";
import SearchScreen from "../screens/SearchScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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

const TopTabBar = ({ navigation, state }) => (
  <TabBar style={{height:50}}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <Tab title='PENDING'/>
    <Tab title='COMPLETED'/>
  </TabBar>
);

export const AppointmentHistoryNav=()=>{
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen name="Appointments" component={AppointmentStatusTabs} />
    </Navigator>
  );
}

export const AppointmentStatusTabs=()=>{
  const { Navigator, Screen } = createMaterialTopTabNavigator();
  return (
    <Navigator tabBar={props => <TopTabBar {...props}/>}>
      <Screen name="Pending" component={PendingAppointments} />
      <Screen name="Completed" component={CompletedAppointments} />
    </Navigator>
  );
}
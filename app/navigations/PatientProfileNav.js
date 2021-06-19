import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabBar, Tab, Text } from "@ui-kitten/components";
import PatientDashboard from "../screens/PatientDashboard";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import BookAppointmentScreen from "../screens/BookAppointmentScreen";
import {
  CompletedAppointments,
  PendingAppointments,
} from "../screens/AppointmentHistory";
import SearchScreen from "../screens/SearchScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ViewHospitalDetails from "../screens/ViewHospitalDetails";
import { Header } from "../components/header/Header";

export const PatientProfileNav = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator mode="modal">
      <Screen
        name="Dashboard"
        component={PatientDashboard}
        options={{ headerTitle: () => <Header title="DoConnect" /> }}
      />
      {/* <Screen name="Profile" component={PersonalDetailsScreen} /> */}
      <Screen name="Search" component={SearchScreen} />
      <Screen
        name="HospitalDetails"
        component={ViewHospitalDetails}
        options={{ headerShown: false }}
      />
      <Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ title: "Book Appointment", headerTitleAlign: "center" }}
      />
    </Navigator>
  );
};

export const BookAppointmentNav = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen
        name="BookAppointment"
        component={BookAppointmentScreen}
        options={{ title: "Book Appointment", headerTitleAlign: "center" }}
      />
    </Navigator>
  );
};

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    style={{ height: 50 }}
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <Tab title="COMPLETED" />
    <Tab title="PENDING" />
  </TabBar>
);

export const AppointmentHistoryNav = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator>
      <Screen
        name="Appointments"
        component={AppointmentStatusTabs}
        options={{ headerTitleAlign: "center" }}
      />
    </Navigator>
  );
};

export const AppointmentStatusTabs = () => {
  const { Navigator, Screen } = createMaterialTopTabNavigator();
  return (
    <Navigator tabBar={(props) => <TopTabBar {...props} />}>
      <Screen name="Completed" component={CompletedAppointments} />
      <Screen name="Pending" component={PendingAppointments} />
    </Navigator>
  );
};

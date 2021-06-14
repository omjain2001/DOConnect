import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  PatientProfileNav,
  BookAppointmentNav,
  AppointmentHistoryNav,
} from "../navigations/PatientProfileNav";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Book" />
    <BottomNavigationTab title="Dashboard" />
    <BottomNavigationTab title="Appointments" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Book" component={BookAppointmentNav} />
    <Screen name="Dashboard" component={PatientProfileNav} />
    <Screen name="Appointments" component={AppointmentHistoryNav} />
  </Navigator>
);

export const PatientNav = () => <TabNavigator />;

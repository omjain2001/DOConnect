import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  PatientProfileNav,
  BookAppointmentNav,
  AppointmentHistoryNav,
} from "../navigations/PatientProfileNav";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Dashboard" />
    <BottomNavigationTab title="Appointments" />
    <BottomNavigationTab title="Profile" />
  </BottomNavigation>
);

// TODO
// 1. ViewProfileScreen has to place as a component in Profile Tab.
const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen
      name="Dashboard"
      component={PatientProfileNav}
      options={{
        tabBarLabel: "Dashboard",
        tabBarIcon: (props) => (
          <Icon
            name="clock"
            fill="#000"
            style={{ height: 25, width: 25 }}
            {...props}
          />
        ),
      }}
    />
    <Screen name="Appointments" component={AppointmentHistoryNav} />
    <Screen name="Profile" component={BookAppointmentNav} />
  </Navigator>
);

export const PatientNav = () => <TabNavigator />;

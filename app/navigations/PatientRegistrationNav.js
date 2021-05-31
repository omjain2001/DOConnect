import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "../screens/RegisterScreen";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";

const Stack = createStackNavigator();

const PatientRegistrationNav = () => {
  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="PersonalDetailsForm"
        component={PersonalDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default PatientRegistrationNav;

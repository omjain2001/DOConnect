import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import QualificationScreen from "../screens/profile/QualificationScreen";
import HospitalDetailsScreen from "../screens/profile/HospitalDetailsScreen";

const Stack = createStackNavigator();

const CompleteProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PersonalDetails">
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetailsScreen}
        options={{ headerTitle: "Complete Profile" }}
      />
      <Stack.Screen
        name="QualificationDetails"
        component={QualificationScreen}
        options={{ headerTitle: "Complete Profile" }}
      />
    </Stack.Navigator>
  );
};

export default CompleteProfileNavigator;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import QualificationScreen from "../screens/profile/QualificationScreen";
import HospitalDetailsScreen from "../screens/profile/HospitalDetailsScreen";

const Stack = createStackNavigator();

const CompleteProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PersonalDetails">
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen
        name="QualificationDetails"
        component={QualificationScreen}
      />
      <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} />
    </Stack.Navigator>
  );
};

export default CompleteProfileNavigator;

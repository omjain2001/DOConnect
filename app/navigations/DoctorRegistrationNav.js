import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import AuthenticateUIDScreen from "../screens/AuthenticateUIDScreen";
import VerifyHospitalScreen from "../screens/VerifyHospitalScreen";
import PersonalDetailsScreen from "../screens/profile/PersonalDetailsScreen";
import QualificationScreen from "../screens/profile/QualificationScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

const DoctorRegistrationNav = () => {
  return (
    <Stack.Navigator mode="card">
      <Stack.Screen
        name="AuthenticateUIDScreen"
        component={AuthenticateUIDScreen}
        options={{ headerTitle: "Authentication" }}
      />
      <Stack.Screen
        name="VerifyHospitalScreen"
        component={VerifyHospitalScreen}
        options={{ headerTitle: "Verification" }}
      />
      <Stack.Screen
        name="registerForm"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
      <Stack.Screen
        name="DoctorRegistrationForm"
        component={PersonalDetailsScreen}
        options={({ route }) => ({
          headerTitle: (props) => (
            <Text {...props} style={{ marginLeft: -30, fontWeight: "bold" }}>
              {route.params.hospitalDetails.hospitalName}
            </Text>
          ),
          headerLeft: (props) => (
            <MaterialCommunityIcons
              name="hospital-marker"
              size={40}
              color="black"
              {...props}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DoctorRegistrationForm-2"
        component={QualificationScreen}
        options={({ route }) => ({
          headerTitle: (props) => (
            <Text {...props} style={{ marginLeft: -30, fontWeight: "bold" }}>
              {route.params.hospitalDetails.hospitalName}
            </Text>
          ),
          headerLeft: (props) => (
            <MaterialCommunityIcons
              name="hospital-marker"
              size={40}
              color="black"
              {...props}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default DoctorRegistrationNav;

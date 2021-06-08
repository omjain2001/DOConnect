import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./AuthNav";
import { LogBox } from "react-native";

const Navigation = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`", "Setting a timer"]);
  }, []);

  return (
    <NavigationContainer>
      <AuthNav />
    </NavigationContainer>
  );
};

export default Navigation;

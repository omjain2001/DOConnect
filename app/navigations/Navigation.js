import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNav from "./AuthNav";

const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthNav />
    </NavigationContainer>
  );
};

export default Navigation;

import React from "react";
import { Text } from "react-native";

function ErrorMsg({ children, style, ...otherProps }) {
  return (
    <Text style={{ fontSize: 10, color: "red" }} {...otherProps}>
      {children}
    </Text>
  );
}

export default ErrorMsg;

import React from "react";
import { Text } from "react-native";

function ErrorMsg({ children, style, visible, ...otherProps }) {
  return visible ? (
    <Text style={{ fontSize: 10, color: "red" }} {...otherProps}>
      {children}
    </Text>
  ) : null;
}

export default ErrorMsg;

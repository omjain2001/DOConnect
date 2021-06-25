import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

export const Header = (props) => {
  const { name, title, ...otherProps } = props;
  return (
    <Layout styles={styles.container}>
      <Text style={styles.title} {...otherProps}>
        {title}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

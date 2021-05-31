import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

const verifyHospital = ({ navigation, route }) => {
  const theme = useTheme();

  const { hospitalDetails } = route.params;

  return (
    <Layout style={styles.container}>
      <Text category="h6" style={{ marginTop: 20 }}>
        Welcome to{" "}
      </Text>
      <Layout style={{ alignItems: "center" }}>
        <Text category="h5" style={{ marginTop: 50, fontWeight: "bold" }}>
          {hospitalDetails?.hospitalName}
        </Text>
        <Divider
          style={{
            width: "20%",
            height: 2,
            backgroundColor: theme["color-primary-500"],
            marginVertical: 10,
          }}
        />
        <Layout
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            marginTop: 20,
          }}
        >
          <Icon
            name="pin-outline"
            fill="#000"
            style={{ height: 35, width: 35 }}
          />
          <Layout style={{ paddingHorizontal: 10, flexGrow: 1 }}>
            <Text category="p1" appearance="hint">
              {hospitalDetails?.address}
            </Text>
          </Layout>
        </Layout>
      </Layout>

      <Button
        style={styles.proceedBtn}
        accessoryRight={() => (
          <Icon
            name="arrow-forward-outline"
            style={{ height: 25, width: 25 }}
            fill="#fff"
          />
        )}
        onPress={() => navigation.navigate("registerForm", { hospitalDetails })}
      >
        Proceed
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  proceedBtn: {
    width: "40%",
    alignSelf: "center",
    marginTop: 40,
  },
});

export default verifyHospital;

import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";

const RegisterStage2Screen = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h6">Welcome to </Text>
      <Layout style={{ alignItems: "center" }}>
        <Text category="h5" style={{ marginTop: 20, fontWeight: "bold" }}>
          Mankind Medicare
        </Text>
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
              Ganga Preet Cooperative Housing Society, Bunglow No 11 Defense
              Officers, Seasons Rd, behind Medipoint Hospital, Oriental Gold
              Society, Aundh, Pune, Maharashtra 411007
            </Text>
          </Layout>
        </Layout>
      </Layout>

      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 50,
        }}
      >
        <Button
          status="danger"
          style={styles.cancelBtn}
          accessoryRight={() => (
            <Icon
              name="close-outline"
              style={{ height: 25, width: 25 }}
              fill="#fff"
            />
          )}
        >
          Cancel
        </Button>
        <Button
          style={styles.proceedBtn}
          accessoryRight={() => (
            <Icon
              name="arrow-forward-outline"
              style={{ height: 25, width: 25 }}
              fill="#fff"
            />
          )}
        >
          Proceed
        </Button>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  proceedBtn: {
    width: "40%",
  },
  cancelBtn: {
    width: "40%",
  },
});

export default RegisterStage2Screen;

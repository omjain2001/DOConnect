import React from "react";
import { Layout, Modal, Spinner } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const CustomSpinner = ({ visible }) => {
  return (
    <Layout style={styles.container}>
      <Modal visible={visible} backdropStyle={styles.backdrop}>
        <Spinner size="giant" />
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    backgroundColor: `rgba(0,0,0,0.5)`,
  },
});

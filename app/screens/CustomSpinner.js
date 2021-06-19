import React from "react";
import { Layout, Modal, Spinner } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const CustomSpinner = ({ visible, style }) => {
  return (
    <Layout style={[styles.container, style]}>
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
    backgroundColor: "transparent",
  },
});

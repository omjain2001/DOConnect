import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon } from "@ui-kitten/components";

function DoctorPatientScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate("AuthenticateUIDScreen")}
      >
        Doctor
      </Button>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate("patientRegistration")}
      >
        Patient
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 300,
    marginBottom: 5,
  },
});

export default DoctorPatientScreen;

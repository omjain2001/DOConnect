import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
import { useDispatch } from "react-redux";
import { setUserType } from "../redux/actions/authActions";
import { USER_TYPE } from "../redux/constants";

function DoctorPatientScreen({ navigation }) {
  const dispatch = useDispatch();

  const handlePress = (routeName, type) => {
    dispatch(setUserType(type));
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        onPress={() => handlePress("doctorRegistration", USER_TYPE.DOCTOR)}
      >
        Doctor
      </Button>
      <Button
        style={styles.btn}
        onPress={() => handlePress("patientRegistration", USER_TYPE.PATIENT)}
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

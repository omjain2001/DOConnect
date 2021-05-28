import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { Button, Icon, Input } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";

import ErrorMsg from "../components/ErrorMsg";

const AlertIcon = (props) => (
  <TouchableWithoutFeedback>
    <Ionicons name="alert-circle-outline" size={24} color="black" />
  </TouchableWithoutFeedback>
);

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  pass: Yup.string().required().min(5).label("Password"),
});

function LoginScreen({ navigation }) {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Ionicons
        name={secureTextEntry ? "ios-eye-off" : "ios-eye"}
        size={24}
        color="black"
      />
    </TouchableWithoutFeedback>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Image
          source={require("../asset/login.png")}
          style={{ height: 300, width: 300 }}
        /> */}
        <Formik
          initialValues={{ name: "", pass: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors }) => (
            <>
              <View style={styles.inputFields}>
                <Input
                  label="Name"
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                />
                <ErrorMsg>{errors.name}</ErrorMsg>

                <Input
                  label="Password"
                  placeholder="Password"
                  caption="Should contain at least 5 characters"
                  accessoryRight={renderIcon}
                  captionIcon={AlertIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={handleChange("pass")}
                />
                <ErrorMsg>{errors.pass}</ErrorMsg>
              </View>
              <View>
                <Button
                  style={styles.btns}
                  onPress={
                    (handleSubmit, navigation.navigate("PatientDashboard"))
                  }
                >
                  LOGIN
                </Button>
                <Button
                  style={styles.btns}
                  onPress={() => navigation.navigate("DoctorPatientScreen")}
                >
                  REGISTER
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  inputFields: {
    paddingVertical: 60,
    width: 300,
  },
  btns: {
    marginVertical: 5,
    width: 300,
  },
});

export default LoginScreen;

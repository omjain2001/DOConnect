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
import * as firebase from "firebase";

import ErrorMsg from "../components/ErrorMsg";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  pass1: Yup.string().required().min(5).label("Password"),
  pass2: Yup.string().required().min(5).label("Password"),
});

function RegisterPatientScreen(props) {
  const onRegister = async ({ name, email, pass1 }) => {
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass1);

      await firebase.firestore.collection("users").doc(result.user.uid).set({
        email: email,
        pass: pass1,
      });
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  };

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Image
          source={require("../asset/register.png")}
          style={{ height: 300, width: 300 }}
        /> */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            pass1: "",
            pass2: "",
          }}
          onSubmit={onRegister}
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
                  label="Email"
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                />
                <ErrorMsg>{errors.email}</ErrorMsg>

                <Input
                  label="Password"
                  placeholder="Password"
                  caption="Should contain at least 5 characters"
                  accessoryRight={renderIcon}
                  captionIcon={AlertIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={handleChange("pass1")}
                />
                <ErrorMsg>{errors.pass1}</ErrorMsg>

                <Input
                  label="Password"
                  placeholder="Password"
                  caption="Should contain at least 8 symbols"
                  accessoryRight={renderIcon}
                  captionIcon={AlertIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={handleChange("pass2")}
                />
                <ErrorMsg>{errors.pass2}</ErrorMsg>
              </View>
              <View>
                <Button style={styles.btns} onPress={handleSubmit}>
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
    paddingVertical: 10,
    width: 300,
  },
  btns: {
    width: 300,
    marginVertical: 5,
  },
});

export default RegisterPatientScreen;
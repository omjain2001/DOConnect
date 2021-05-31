import React, { useReducer } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { Button, Icon, Input, Layout } from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Register } from "../auth/auth";
import { auth, firestore } from "../auth/firebase";

import ErrorMsg from "../components/ErrorMsg";
import FormField from "../components/forms/FormField";
import Form from "../components/forms/Form";
import SubmitForm from "../components/forms/SubmitForm";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const validationSchema = Yup.object().shape({
  // name: Yup.string().trim().required("*Required").label("Name"),
  email: Yup.string().required().email().label("Email"),
  pass1: Yup.string().required().min(5).label("Password"),
  pass2: Yup.string()
    .required()
    .min(5)
    .label("Confirm Password")
    .oneOf([Yup.ref("pass1")], "Passwords do not match"),
});

function RegisterScreen({ navigation, route }) {
  const { type, hospitalDetails } = route.params;

  console.log(type, hospitalDetails);

  const handleRegister = async ({ email, pass1 }) => {
    try {
      const user = await Register(email, pass1);

      if (user?.user) {
        if (type == "doctor") {
          const newUser = await firestore
            .collection("hospitals")
            .doc(hospitalDetails.id)
            .collection("doctors")
            .add({
              email,
              isProfileSet: false,
            });

          if (newUser.id) {
            navigation.navigate("DoctorRegistrationForm", {
              ...route.params,
              hospitalDetails,
              newUser: { id: newUser.id },
            });
          }
        } else {
          const newUser = await firestore.collection("patients").add({
            email,
            isProfileSet: false,
          });

          if (newUser.id) {
            navigation.navigate("PersonalDetailsForm", {
              ...route.params,
              newUser: { id: newUser.id },
            });
          }
        }
      }
    } catch (error) {
      console.log(error.message);
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
      <Layout style={styles.container}>
        <Image
          source={require("../asset/register.png")}
          style={{ height: 300, width: 300 }}
        />
        {/* <Layout style={styles.container}> */}
        <Form
          initialValues={{
            email: "",
            pass1: "",
            pass2: "",
          }}
          onSubmit={handleRegister}
          validationSchema={validationSchema}
        >
          <FormField label="Email" placeholder="Email" name="email" />
          <FormField
            label="Password"
            name="pass1"
            placeholder="Password"
            // caption="Should contain at least 5 characters"
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={secureTextEntry}
          />
          <FormField
            label="Confirm Password"
            placeholder="Confirm Password"
            name="pass2"
            // caption="Should contain at least 5 characters"
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={secureTextEntry}
          />
          <SubmitForm label="Register" />

          {/* {({ handleChange, handleSubmit, errors }) => (
            <>
              <View style={styles.inputFields}>
                <Input
                  label="Name"
                  placeholder="Name"
                  onChangeText={() => handleChange("name")}
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
                  label="Confirm Password"
                  placeholder="Confirm Password"
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
          )} */}
        </Form>
        {/* </Layout> */}
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginVertical: 100,
    paddingHorizontal: 10,
    alignItems: "center",
    // justifyContent: "center",
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

export default RegisterScreen;

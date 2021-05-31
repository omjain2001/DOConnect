import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import {
  Button,
  Icon,
  IndexPath,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";

import ErrorMsg from "../components/ErrorMsg";
import { Login } from "../auth/auth";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";
import { firestore } from "../auth/firebase";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required").label("Email"),
  password: Yup.string().required("Required").min(5).label("Password"),
});

function LoginScreen({ navigation }) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const userType = ["Doctor", "Patient"];

  const handleSubmit = async (values) => {
    try {
      const getUser = await firestore
        .collection(
          userType[selectedIndex.row] === "Doctor" ? "doctors" : "patients"
        )
        .where("email", "==", values.email)
        .get();

      if (getUser.docs.length > 0) {
        const user = await Login(values.email, values.password);
        if (user.user) {
          console.log("User Logged in successfully");
        }
      } else {
        alert(`Invalid user or user type`);
      }
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong Password");
      } else {
        alert(error.message);
      }
    }

    // if (userType[selectedIndex.row] === "Doctor") {
    //   const getUser = await firestore
    //     .collection("doctors")
    //     .where("email", "==", values.email)
    //     .get();

    //     if(getUser.docs().length > 0){
    //       const user = await Login(values.email, values.password);
    //       if(user.user){
    //         console.log("User Logged in successfully");
    //         console.log(auth.currentUser);
    //       }
    //     }
    //     else {
    //       alert("User is not a doctor");
    //     }
    // }
    // else {
    //   const getUser = await firestore
    //   .collection("patients")
    //   .where("email", "==", values.email)
    //   .get();

    //   if(getUser.docs().length > 0){
    //     const user = await Login(values.email, values.password);
    //     if(user.user){
    //       console.log("User Logged in successfully");
    //       console.log(auth.currentUser);
    //     }
    //   }
    //   else {
    //     alert("User is not a patient");
    //   }
    // }

    /**
     * TODO
     * 1. If the user type is doctor, then he should be directed to Doctor Dashboard
     * 2. If the user type is patient, then he should be directed to Patient Dashboard
     * 3. If user is a patient and selects doctor, throw error
     * 4. If user is a doctor and selects patient, throw error
     */
    // if (user.user) {
    //   if (userType[selectedIndex] == "patient") {
    //     console.log("Should navigate to Patient Dashboard");
    //   } else {
    //     console.log("Should navigate to Patient Dashboard");
    //   }
    // }
  };

  return (
    <ScrollView>
      <Layout style={styles.container}>
        {/* <Image
          source={require("../asset/login.png")}
          style={{ height: 300, width: 300 }}
        /> */}
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField name="email" label="Email" placeholder="Email" />
          <FormField
            name="password"
            label="Password"
            placeholder="Password"
            accessoryRight={renderIcon}
            captionIcon={AlertIcon}
            secureTextEntry={secureTextEntry}
          />
          <Layout style={{ width: "100%" }}>
            <Select
              label="User Type"
              value={userType[selectedIndex.row]}
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
              style={{
                width: "100%",
                paddingHorizontal: 5,
                marginVertical: 10,
              }}
            >
              <SelectItem title="Doctor" />
              <SelectItem title="Patient" />
            </Select>
          </Layout>
          <SubmitForm
            label="Login"
            btnStyle={{ width: "80%", marginTop: 20 }}
          />
          <SubmitForm
            label="Register"
            btnStyle={{ width: "80%" }}
            onPress={() => navigation.navigate("DoctorPatientScreen")}
          />
          {/* {({ handleChange, handleSubmit, errors }) => (
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
              <Layout>
                <Select
                  label="Type of User"
                  value={userType[selectedIndex]}
                  selectedIndex={selectedIndex}
                  onSelect={(index) => setSelectedIndex(index)}
                >
                  <SelectItem title="Doctor" />
                  <SelectItem title="Patient" />
                </Select>
              </Layout>
              <View>
                <Button style={styles.btns} onPress={handleSubmit}>
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
          )} */}
        </Form>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
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

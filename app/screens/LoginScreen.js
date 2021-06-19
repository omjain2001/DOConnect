import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, ScrollView } from "react-native";
import {
  Icon,
  IndexPath,
  Layout,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import * as Yup from "yup";

import { Login } from "../auth/auth";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";
import { auth } from "../auth/firebase";
import { USER_TYPE } from "../redux/constants";
import { useDispatch } from "react-redux";
import { fetchUser, setUserType } from "../redux/actions/authActions";
import { CustomSpinner } from "./CustomSpinner";
import { fetchAppointments } from "../redux/actions/appointmentActions";

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Required").label("Email"),
  password: Yup.string().required("Required").min(5).label("Password"),
});

function LoginScreen({ navigation }) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [isLoading, setIsLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const userType = ["Doctor", "Patient"];
  // const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const type =
      userType[selectedIndex.row].toLowerCase() === USER_TYPE.DOCTOR
        ? USER_TYPE.DOCTOR
        : USER_TYPE.PATIENT;

    try {
      const user = await Login(values.email, values.password);
      if (user.user) {
        dispatch(setUserType(type));
        const res = await dispatch(fetchUser(values.email, type));
        dispatch(fetchAppointments(res.data.id));
        setIsLoading(false);

        if (!res.data.isProfileSet) {
          if (type === USER_TYPE.DOCTOR) {
            navigation.navigate("doctorRegistration", {
              screen: "DoctorRegistrationForm",
            });
          } else {
            navigation.navigate("patientRegistration", {
              screen: "PersonalDetailsForm",
            });
          }
        } else {
          if (type === USER_TYPE.DOCTOR) {
            console.log("Redirect to Doctor dashboard");
          } else {
            console.log("Redirect to Patient dashboard");
          }
        }
      } else {
        setIsLoading(false);
        await auth.signOut();
        alert("Invalid user or user type");
      }
    } catch (error) {
      setIsLoading(false);
      const errorCode = error.code;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong Password");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <ScrollView>
      <Layout style={styles.container}>
        {/* <Image
          source={require("../asset/login.png")}
          style={{ height: 300, width: 300 }}
        /> */}
        <CustomSpinner visible={isLoading} />
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

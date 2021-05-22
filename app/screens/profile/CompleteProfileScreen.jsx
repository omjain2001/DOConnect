import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  Layout,
  Radio,
  RadioGroup,
  Text,
  Button,
  Divider,
  useTheme,
} from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";

const PersonalDetailsScreen = () => {
  const theme = useTheme();
  const personalDetailsValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("Required"),
    lastName: Yup.string().trim().required("Required"),
    age: Yup.number()
      .min(18, "Age should be greater than 18")
      .required("Required")
      .nullable(true),
    email: Yup.string().email().trim().required("Required"),
    gender: Yup.string().trim(),
    phone: Yup.string()
      .length(10, "Invalid contact number!")
      .required("Required"),
  });

  const qualificationDetailsValidationSchema = Yup.object().shape({
    degree: Yup.string().trim().required("Required"),
    specialization: Yup.string().trim(),
    experienceYears: Yup.number(),
    bio: Yup.string().trim(),
  });

  const hospitalDetailsValidationSchema = Yup.object().shape({
    hospitalName: Yup.string().trim().required("Required"),
    address: Yup.string().trim().required(),
    phone1: Yup.string().trim().length(10),
    phone2: Yup.string().trim().length(10),
    telephone: Yup.string().trim(),
    openingTime: Yup.string().trim().required("Required"),
    closingTime: Yup.string().trim().required("Required"),
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const gender = ["male", "female", "other"];

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Layout style={styles.form}>
          <Layout style={styles.category}>
            <Text category="h6">Personal Details</Text>
            <Divider
              style={[
                styles.divider,
                { backgroundColor: theme["color-primary-500"] },
              ]}
            />
          </Layout>

          <Form
            initialValues={{
              firstName: "",
              lastName: "",
              age: null,
              email: "",
              gender: gender[selectedIndex],
              phone: "",
            }}
            validationSchema={personalDetailsValidationSchema}
            onSubmit={(values) => console.log(values)}
          >
            <FormField
              label="First Name"
              placeholder="First Name"
              name="firstName"
            />
            <FormField
              label="Last Name"
              placeholder="Last Name"
              name="lastName"
            />
            <FormField
              label="Age"
              placeholder="Age"
              keyboardType="number-pad"
              name="age"
            />
            <FormField
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              name="email"
            />
            <Layout style={styles.radioContainer}>
              <Text appearance="hint" style={{ fontSize: 12.5 }}>
                Gender
              </Text>
              <RadioGroup
                selectedIndex={selectedIndex}
                onChange={(index) => setSelectedIndex(index)}
                style={styles.radioGroup}
              >
                <Radio>Male</Radio>
                <Radio>Female</Radio>
                <Radio>Other</Radio>
              </RadioGroup>
            </Layout>
            <FormField
              label="Phone"
              placeholder="Phone"
              keyboardType="number-pad"
              name="phone"
            />
            <Button style={styles.btn}>Next</Button>
          </Form>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    alignSelf: "center",
  },
  category: {
    alignItems: "center",
    marginVertical: 30,
  },
  divider: {
    width: "60%",
    height: 2,
    borderRadius: 10,
    marginTop: 5,
  },
  radioContainer: {
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 2,
  },
  radioGroup: {
    flexDirection: "row",
  },
  btn: {
    marginTop: 15,
  },
});

export default PersonalDetailsScreen;

import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Input,
  Datepicker,
  Text,
  RadioGroup,
  Radio,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";

import { ScrollView } from "react-native-gesture-handler";
import Form from "../components/forms/Form";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";

const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required("Please Enter your First Name.").label(),
  LastName: Yup.string().required("Please Enter your Last Name.").label(),
  ContactNo: Yup.number()
    .typeError()
    .positive()
    .integer()
    .min(8)
    .required("Please Enter your Contact number.")
    .label(),
  Age: Yup.number()
    .required()
    .positive()
    .integer("Please enter your Age")
    .label(),
  Symptoms: Yup.string().required(),
});

function BookAppointmentScreen({ navigation }) {
  const handleSubmit = (values) => {
    console.log("registered");
    navigation.navigate("PatientDashboard");
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const Gender = ["Male", "Female", "Others"];

  const [date, setDate] = React.useState(new Date());

  const CalendarIcon = (props) => <Icon {...props} name="calendar" />;

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Text category="h3" style={{ textAlign: "center" }}>
          Book Appointment
        </Text>
        <Form
          initialValues={{
            FirstName: "",
            LastName: "",
            ContactNo: "",
            Age: "",
            Gender: Gender[selectedIndex],
            Symptoms: "",
            AppointmentDate: date.toLocaleDateString(),
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <FormField
            label="First Name"
            name="FirstName"
            placeholder="Enter your First Name"
          />
          <FormField
            label="Last Name"
            name="LastName"
            placeholder="Enter your Last name"
          />
          <FormField
            label="Contact Number"
            name="ContactNo"
            placeholder="Enter your Mobile Number"
          />
          <FormField label="Age" name="Age" placeholder="Enter your Age" />
          <Layout style={styles.fields}>
            <Text appearance="hint" style={{ fontSize: 12 }}>
              Gender
            </Text>
            <RadioGroup
              style={{ flex: 9, flexDirection: "row" }}
              selectedIndex={selectedIndex}
              name="gender"
              onChange={(index) => setSelectedIndex(index)}
            >
              <Radio style={{ flex: 3 }}>Female</Radio>
              <Radio style={{ flex: 3 }}>Male</Radio>
              <Radio style={{ flex: 3 }}>Other</Radio>
            </RadioGroup>
          </Layout>
          <Layout style={styles.fields}>
            <Text appearance="hint" style={{ fontSize: 12 }}>
              Select Appointment date
            </Text>
            <Datepicker
              accessoryRight={CalendarIcon}
              date={date}
              onSelect={(nextDate) => setDate(nextDate)}
            />
          </Layout>
          <FormField
            multiline={true}
            label="Symptoms"
            placeholder="Enter Symptoms you are having"
          />

          <SubmitForm label="Book" />
        </Form>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  fields: { width: "100%", paddingHorizontal: 5, marginVertical: 10 },
});

export default BookAppointmentScreen;

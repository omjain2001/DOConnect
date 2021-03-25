import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import {
  Layout,
  Text,
  Button,
  Divider,
  useTheme,
  Card,
} from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useFormikContext } from "formik";
import SubmitForm from "../../components/forms/SubmitForm";

const SelectTime = ({ label, name }) => {
  const [showTime, setShowTime] = useState(false);
  const { setFieldValue, values, errors } = useFormikContext();
  const theme = useTheme();

  return (
    <>
      <Card
        style={{ width: "45%", elevation: 8 }}
        header={(props) => (
          <Text
            appearance="hint"
            style={{
              fontSize: 14,
              alignSelf: "center",
              padding: 10,
            }}
          >
            {label}
          </Text>
        )}
        footer={(props) => (
          <Button
            {...props}
            style={{ width: "100%", height: 50 }}
            onPress={() => setShowTime(true)}
          >
            Select Time
          </Button>
        )}
      >
        <Text style={{ alignSelf: "center" }}>
          {values[name] ? moment(values[name]).format("LT") : null}
        </Text>
      </Card>

      {showTime && (
        <DateTimePicker
          style={{ backgroundColor: theme["color-primary-500"] }}
          mode="time"
          is24Hour={false}
          display="default"
          value={values[name] ? new Date(values[name]) : new Date()}
          onChange={(value, selectedDate) => {
            setShowTime(false);
            setFieldValue(name, selectedDate);
          }}
        />
      )}
    </>
  );
};

const HospitalDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme();

  const hospitalDetailsValidationSchema = Yup.object().shape({
    hospitalName: Yup.string().trim().required("Required"),
    address: Yup.string().trim().required(),
    phone1: Yup.string().trim().length(10),
    phone2: Yup.string().trim().length(10),
    telephone: Yup.string().trim(),
    openingTime: Yup.object().nullable(),
    closingTime: Yup.object().nullable(),
  });

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
        <>
          <Layout style={styles.category}>
            <Text category="h6">Hospital Details</Text>
            <Divider
              style={[
                styles.divider,
                { backgroundColor: theme["color-primary-500"] },
              ]}
            />
          </Layout>

          <Form
            initialValues={{
              hospitalName: "",
              address: "",
              phone1: "",
              phone2: "",
              telephone: "",
              openingTime: null,
              closingTime: null,
            }}
            validationSchema={hospitalDetailsValidationSchema}
            onSubmit={(values) => {
              if (values.openingTime === null || values.closingTime === null) {
                return Alert.alert(
                  "Warning",
                  "Please mention opening and closing time"
                );
              }
              console.log({
                ...route.params.values,
                ...values,
                openingTime: moment(values.openingTime).format("LT"),
                closingTime: moment(values.closingTime).format("LT"),
              });
            }}
          >
            <FormField
              label="Hospital Name"
              placeholder="Hospital Name"
              name="hospitalName"
            />
            <FormField label="Address" placeholder="Address" name="address" />
            <FormField
              label="Phone 1"
              placeholder="Phone 1"
              keyboardType="number-pad"
              name="phone1"
            />
            <FormField
              label="Phone 2"
              placeholder="Phone 2"
              keyboardType="number-pad"
              name="phone2"
            />
            <FormField
              label="Telephone"
              placeholder="Telephone"
              keyboardType="number-pad"
              name="telephone"
            />
            <Layout
              style={{
                flexDirection: "row",
                marginBottom: 50,
                justifyContent: "space-evenly",
                marginTop: 20,
              }}
            >
              <SelectTime label="Opening Time" name="openingTime" />
              <SelectTime label="Closing Time" name="closingTime" />
            </Layout>
            <Layout
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <SubmitForm
                label="Previous"
                btnStyle={{ width: "40%" }}
                onPress={() => navigation.goBack()}
              />
              <SubmitForm label="Submit" btnStyle={{ width: "40%" }} />
            </Layout>
          </Form>
        </>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
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
  btn: {
    marginTop: 15,
    width: "40%",
  },
});

export default HospitalDetailsScreen;

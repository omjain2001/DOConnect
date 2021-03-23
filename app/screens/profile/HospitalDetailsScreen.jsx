import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
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

const TimeCard = ({ label, value, showTimePicker }) => (
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
        onPress={() => showTimePicker(true)}
      >
        Select Time
      </Button>
    )}
  >
    <Text style={{ alignSelf: "center" }}>{moment(value).format("LT")}</Text>
  </Card>
);

const HospitalDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [showOpeningTime, setShowOpeningTime] = useState(false);
  const [showClosingTime, setShowClosingTime] = useState(false);

  const hospitalDetailsValidationSchema = Yup.object().shape({
    hospitalName: Yup.string().trim().required("Required"),
    address: Yup.string().trim().required(),
    phone1: Yup.string().trim().length(10),
    phone2: Yup.string().trim().length(10),
    telephone: Yup.string().trim(),
    // openingTime: Yup.string().trim().required("Required"),
    // closingTime: Yup.string().trim().required("Required"),
  });

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
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
              // openingTime: "",
              // closingTime: "",
            }}
            validationSchema={hospitalDetailsValidationSchema}
            onSubmit={(values) =>
              console.log({ ...route.params.values, ...values })
            }
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
              {/* <FormField
                label="Opening Time"
                placeholder="Select time"
                name="openingTime"
                value={openingTime.getHours() + ":" + openingTime.getMinutes()}
                style={{ width: "45%" }}
                onFocus={() => setShowOpeningTime(true)}
              /> */}

              <TimeCard
                label="Opening Time"
                value={openingTime}
                showTimePicker={(val) => setShowOpeningTime(val)}
              />

              {showOpeningTime && (
                <DateTimePicker
                  mode="time"
                  is24Hour={false}
                  display="default"
                  value={new Date(openingTime)}
                  onChange={(value, selectedDate) => {
                    setShowOpeningTime(false);
                    setOpeningTime(selectedDate);
                  }}
                />
              )}

              <TimeCard
                label="Closing Time"
                value={closingTime}
                showTimePicker={(val) => setShowClosingTime(val)}
              />

              {showClosingTime && (
                <DateTimePicker
                  mode="time"
                  is24Hour={false}
                  display="default"
                  value={closingTime}
                  onChange={(value, selectedDate) => {
                    setShowClosingTime(false);
                    setClosingTime(selectedDate);
                  }}
                />
              )}
            </Layout>
            <Layout
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              {/* <Button style={styles.btn} onPress={() => navigation.goBack()}>
                Previous
              </Button>
              <Button style={styles.btn} onPress={() => handleSubmit()}>
                Next
              </Button> */}
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
    // marginTop: 20,
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
  btn: {
    marginTop: 15,
    width: "40%",
  },
});

export default HospitalDetailsScreen;

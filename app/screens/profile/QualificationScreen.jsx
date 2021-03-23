import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Layout, Text, Button, Divider, useTheme } from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import { useFormikContext } from "formik";
import SubmitForm from "../../components/forms/SubmitForm";

const QualificationScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const qualificationDetailsValidationSchema = Yup.object().shape({
    degree: Yup.string().trim().required("Required"),
    specialization: Yup.string().trim(),
    experienceYears: Yup.string(),
    bio: Yup.string().trim(),
  });

  return (
    <Layout style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Layout style={styles.form}>
          <Layout style={styles.category}>
            <Text category="h6">Qualification Details</Text>
            <Divider
              style={[
                styles.divider,
                { backgroundColor: theme["color-primary-500"] },
              ]}
            />
          </Layout>

          <Form
            initialValues={{
              degree: "",
              specialization: "",
              experienceYears: "",
              bio: "",
            }}
            validationSchema={qualificationDetailsValidationSchema}
            onSubmit={(values) => {
              console.log({ ...route.params.values, ...values });
              navigation.navigate("HospitalDetails", {
                values: { ...route.params.values, ...values },
              });
            }}
          >
            <FormField label="Degree" placeholder="Degree" name="degree" />
            <FormField
              label="Specialization"
              placeholder="Specialization"
              name="specialization"
            />
            <FormField
              label="Years of Experience"
              placeholder="Years"
              keyboardType="number-pad"
              name="experienceYears"
            />
            <FormField label="Bio" placeholder="Bio" multiline name="bio" />
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
              <SubmitForm label="Next" btnStyle={{ width: "40%" }} />
            </Layout>
          </Form>
        </Layout>
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
    width: "40%",
  },
});

export default QualificationScreen;

import React from "react";
import { StyleSheet } from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";
import Form from "../components/forms/Form";
import * as Yup from "yup";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HospitalUIDScreen = () => {
  const validationSchema = Yup.object().shape({
    UID: Yup.string().required("Please mention hospital UID"),
  });

  const theme = useTheme();

  return (
    <Layout style={styles.container}>
      <MaterialCommunityIcons
        name="hospital-building"
        size={100}
        color={theme["color-primary-500"]}
        style={{ marginBottom: 30 }}
      />
      <Form
        initialValues={{ UID: "" }}
        validationSchema={validationSchema}
        onSubmit={(value) => console.log(value)}
      >
        <FormField label="Hospital Unique Id" name="UID" placeholder="UID" />
        <SubmitForm label="Next" btnStyle={{ width: "50%" }} />
      </Form>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
    width: "100%",
    paddingHorizontal: 10,
  },
});

export default HospitalUIDScreen;

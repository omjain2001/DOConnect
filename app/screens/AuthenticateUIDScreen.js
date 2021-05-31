import React from "react";
import { StyleSheet } from "react-native";
import { Layout, useTheme } from "@ui-kitten/components";
import Form from "../components/forms/Form";
import * as Yup from "yup";
import FormField from "../components/forms/FormField";
import SubmitForm from "../components/forms/SubmitForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firestore } from "../auth/firebase";
import firebase from "firebase";

const HospitalUIDScreen = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    UID: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : +value))
      .positive()
      .integer("UID must be a number")
      .required("Please mention hospital UID"),
  });

  const handleSubmit = async (values) => {
    try {
      const getHospital = await firestore
        .collection("hospitals")
        .where("UID", "==", +values.UID)
        .get();

      if (getHospital.size === 1) {
        getHospital.forEach((doc) => {
          const hospitalDetails = doc.data();
          console.log(doc.uid, "UID");
          navigation.navigate("VerifyHospitalScreen", {
            hospitalDetails: { ...hospitalDetails, id: doc.id },
          });
        });
      } else {
        alert("Hospital does not exist");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const theme = useTheme();

  return (
    <Layout style={styles.container}>
      <MaterialCommunityIcons
        name="hospital-building"
        size={100}
        color={theme["color-primary-500"]}
        style={{ marginBottom: 30, marginTop: 20 }}
      />
      <Form
        initialValues={{ UID: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
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
    width: "100%",
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default HospitalUIDScreen;

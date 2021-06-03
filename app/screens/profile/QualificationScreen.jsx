import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Layout, Text, Button, Divider, useTheme } from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import SubmitForm from "../../components/forms/SubmitForm";
import { firestore } from "../../auth/firebase";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/authActions";
import { CustomSpinner } from "../CustomSpinner";

const QualificationScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const qualificationDetailsValidationSchema = Yup.object().shape({
    degree: Yup.string().trim().required("Required"),
    specialization: Yup.string().trim(),
    yearsOfExp: Yup.number().positive(),
    bio: Yup.string().trim(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const handleSubmit = (values) => {
    console.log("running");
    setIsLoading(true);
    dispatch(
      setUser({
        ...auth.user,
        ...values,
        isProfileSet: true,
      })
    )
      .then((res) => {
        setIsLoading(false);
        console.log(res.message);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e.message);
      });

    // try {
    //   await firestore
    //     .collection("hospitals")
    //     .doc(hospitalDetails.id)
    //     .collection("doctors")
    //     .doc(newUser.id)
    //     .set(
    //       {
    //         ...profile,
    //         ...values,
    //       },
    //       { merge: true }
    //     );
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  console.log("In QualificationScreen");

  return (
    <Layout style={styles.container}>
      <CustomSpinner visible={isLoading} />
      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
        <>
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
              degree: auth.user?.degree ? auth.user.degree : "",
              specialization: auth.user?.specialization
                ? auth.user.specialization
                : "",
              yearsOfExp: auth.user?.yearsOfExp ? auth.user.yearsOfExp : 0,
              bio: auth.user?.bio ? auth.user.bio : "",
            }}
            validationSchema={qualificationDetailsValidationSchema}
            onSubmit={(values) => {
              console.log(values);
              handleSubmit(values);
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
            <FormField
              label="Bio"
              placeholder="Write about yourself"
              multiline={true}
              name="bio"
              textStyle={{ minHeight: 100, textAlignVertical: "top" }}
            />
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
    width: "20%",
    height: 2,
    borderRadius: 10,
    marginVertical: 10,
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

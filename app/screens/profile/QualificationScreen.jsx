import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Layout, Text, Divider, useTheme } from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import SubmitForm from "../../components/forms/SubmitForm";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/authActions";
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

  const handleSubmit = (values) => {
    setIsLoading(true);
    const { profile } = route.params;
    let profileImgUrl = null;
    if (
      profile.profileImg !== null &&
      profile.profileImg !== auth.user.profileImg
    ) {
      try {
        if (auth.user.profileImg !== null) {
          const getImageRef = storage.refFromURL(auth.user.profileImg);
          await getImageRef.delete();
        }
        const imageRef = storage.ref(
          `${auth.currentUser.uid}/profile.${profile.profileImg
            .split(".")
            .pop()}`
        );
        const imageBlob = await(await fetch(profile.profileImg)).blob();
        await imageRef.put(imageBlob);
        profileImgUrl = await imageRef.getDownloadURL();
      } catch (error) {
        console.log(error.message);
      }
    }
    await dispatch(
      updateUser({
        ...route.params.profile,
        profileImg: profileImgUrl,
        ...values,
        isProfileSet: true,
      })
    );
    setIsLoading(false);
  };

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

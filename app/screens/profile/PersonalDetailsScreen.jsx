import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Layout,
  Radio,
  RadioGroup,
  Text,
  Button,
  Divider,
  useTheme,
  Icon,
  Modal,
  Card,
} from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import * as ImagePicker from "expo-image-picker";
import SubmitForm from "../../components/forms/SubmitForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageView from "react-native-image-view";
import { storage } from "../../auth/firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions/authActions";
import { USER_TYPE } from "../../redux/constants";
import { CustomSpinner } from "../CustomSpinner";

const PersonalDetailsScreen = ({ navigation, route }) => {
  // Theme
  const theme = useTheme();

  // States
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [uri, setUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redux state
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Get Camera Access
  const getCameraAccess = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (granted) {
      const launchCamera = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!launchCamera.cancelled) {
        return setUri(launchCamera.uri);
      }
    }
  };

  // Get Media Access
  const getMediaAccess = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (granted) {
      const launchMedia = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
      if (!launchMedia.cancelled) {
        return setUri(launchMedia.uri);
      }
    }
  };

  // Validation Schema
  const personalDetailsValidationSchema = Yup.object().shape({
    firstName: Yup.string().trim().required("Required"),
    lastName: Yup.string().trim().required("Required"),
    age: Yup.number()
      .min(18, "Age should be greater than 18")
      .required("Required")
      .nullable(true),
    gender: Yup.string().trim(),
    phone: Yup.string()
      .length(10, "Invalid contact number!")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (auth.userType === USER_TYPE.PATIENT) {
        let profileImgUrl = null;
        if (uri !== null && uri !== auth.user.profileImg) {
          try {
            if (auth.user.profileImg !== null) {
              const getImageRef = storage.refFromURL(auth.user.profileImg);
              await getImageRef.delete();
            }
            const imageRef = storage.ref(
              `${auth.currentUser.uid}/profile.${uri.split(".").pop()}`
            );
            const imageBlob = await (await fetch(uri)).blob();
            await imageRef.put(imageBlob);
            profileImgUrl = await imageRef.getDownloadURL();
          } catch (error) {
            console.log(error.message);
          }
        }
        await dispatch(
          updateUser({
            ...auth.user,
            profileImg: profileImgUrl?.data,
            isProfileSet: true,
            ...values,
          })
        );
        setIsLoading(false);
      } else {
        setIsLoading(false);
        navigation.navigate("DoctorRegistrationForm-2", {
          profile: {
            ...values,
            gender: gender[selectedIndex],
            profileImg: uri,
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        "Error in uploading profile",
        "Unable to update profile. Please try after some time."
      );
    }
  };

  const gender = ["male", "female", "other"];

  return (
    <Layout style={styles.container}>
      <CustomSpinner visible={isLoading} />
      <Modal
        visible={modalVisible}
        backdropStyle={{ backgroundColor: "grey" }}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Card
          style={{ width: "100%", padding: 10 }}
          header={() => (
            <Text
              style={{ marginVertical: 10, fontWeight: "bold", fontSize: 15 }}
              adjustsFontSizeToFit={true}
            >
              How do you want to upload your photo?
            </Text>
          )}
        >
          <Button
            onPress={() => {
              getCameraAccess();
              setModalVisible(false);
            }}
            style={{ marginVertical: 10 }}
          >
            Take a photo
          </Button>
          <Button
            onPress={() => {
              getMediaAccess();
              setModalVisible(false);
            }}
            style={{ marginVertical: 10 }}
          >
            Choose from gallery
          </Button>
          <Button
            onPress={() => {
              setUri(null);
              setModalVisible(false);
            }}
            style={{ marginVertical: 10 }}
          >
            Remove photo
          </Button>
          <Button
            onPress={() => setModalVisible(false)}
            style={{ marginVertical: 10 }}
          >
            Cancel
          </Button>
        </Card>
      </Modal>
      <ScrollView style={{ width: "100%", paddingHorizontal: 10 }}>
        <>
          <Layout style={styles.category}>
            <Text category="h6">Personal Details</Text>
            <Divider
              style={[
                styles.divider,
                { backgroundColor: theme["color-primary-500"] },
              ]}
            />
          </Layout>

          <Layout
            style={[
              styles.profileImgContainer,
              { backgroundColor: theme["color-primary-transparent-200"] },
            ]}
          >
            <TouchableOpacity
              style={styles.editImgIconContainer}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons
                name="circle-edit-outline"
                color={theme["color-primary-500"]}
                size={30}
              />
            </TouchableOpacity>
            <ImageView
              images={[{ source: { uri } }]}
              isVisible={viewImage}
              imageIndex={0}
              animationType="fade"
              onClose={() => setViewImage(false)}
              style={styles.profileImg}
            />
            {uri ? (
              <TouchableOpacity onPress={() => setViewImage(true)}>
                <Image
                  source={{
                    uri,
                  }}
                  style={styles.profileImg}
                />
              </TouchableOpacity>
            ) : (
              <Icon
                name="person-outline"
                fill={theme["color-primary-500"]}
                style={{ height: 80, width: 80 }}
              />
            )}
          </Layout>

          <Form
            initialValues={{
              firstName: auth.user?.firstName ? auth.user.firstName : "",
              lastName: auth.user?.lastName ? auth.user.lastName : "",
              age: auth.user?.age ? auth.user.age : null,
              // email: "",
              gender: auth.user?.gender
                ? auth.user.gender
                : gender[selectedIndex],
              phone: auth.user?.phone ? auth.user.phone : "",
            }}
            validationSchema={personalDetailsValidationSchema}
            onSubmit={handleSubmit}
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
            {/* <FormField
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              name="email"
            /> */}
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
            <Layout
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              {auth.userType === USER_TYPE.PATIENT ? (
                <SubmitForm label="Submit" btnStyle={{ width: "40%" }} />
              ) : (
                <>
                  {/* <SubmitForm
                    label="Previous"
                    btnStyle={{ width: "40%" }}
                    onPress={() => navigation.}
                  /> */}
                  <SubmitForm label="Next" btnStyle={{ width: "40%" }} />
                </>
              )}
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
    marginVertical: 10,
  },
  profileImgContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  profileImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  editImgIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  editImgIcon: {
    height: 30,
    width: 30,
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

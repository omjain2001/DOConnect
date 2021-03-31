import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  LogBox,
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
  ButtonGroup,
} from "@ui-kitten/components";
import * as Yup from "yup";
import Form from "../../components/forms/Form";
import FormField from "../../components/forms/FormField";
import { useFormikContext } from "formik";
import * as ImagePicker from "expo-image-picker";
import SubmitForm from "../../components/forms/SubmitForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ImageView from "react-native-image-view";

const PersonalDetailsScreen = ({ navigation }) => {
  // Theme
  const theme = useTheme();

  // States
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gender = ["male", "female", "other"];
  const [uri, setUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewImage, setViewImage] = useState(false);

  // Hooks
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

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
    email: Yup.string().email().trim().required("Required"),
    gender: Yup.string().trim(),
    phone: Yup.string()
      .length(10, "Invalid contact number!")
      .required("Required"),
  });

  return (
    <Layout style={styles.container}>
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
                <Image source={{ uri }} style={styles.profileImg} />
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
              firstName: "",
              lastName: "",
              age: null,
              email: "",
              gender: gender[selectedIndex],
              phone: "",
            }}
            validationSchema={personalDetailsValidationSchema}
            onSubmit={(values) => {
              navigation.navigate("QualificationDetails", {
                values: { ...values, gender: gender[selectedIndex] },
              });
            }}
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
            <SubmitForm label="Next" />
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

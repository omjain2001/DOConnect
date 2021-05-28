import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import NewsCarousel from "../components/Carousel/NewsCarousel";
import { Ionicons } from "@expo/vector-icons";
function PatientDashboard({ props, navigation }) {
  const SearchIcon = (props) => {
    return <Ionicons name="ios-search-sharp" size={24} color="black" />;
  };

  useEffect(() => {}, []);

  return (
    <ScrollView {...props}>
      <View style={styles.container} {...props}>
        <Text style={styles.heading} category="h3" {...props}>
          Dashboard
        </Text>
        <Input placeholder="Search" accessoryLeft={SearchIcon} />
        <View style={styles.carousel}>
          <NewsCarousel />
        </View>
        <Button
          onPress={props.navigation.navigate("BookAppointmentScreen")}
          style={styles.btn}
        >
          <Text>Book Appointment</Text>
        </Button>
        <Button style={[styles.btn, { marginBottom: 20 }]}>
          <Text>View Appointment History</Text>
        </Button>
        <Layout style={[styles.feedBack, { paddingTop: 20 }]} level="1">
          <Input
            multiline={true}
            textStyle={[styles.feedbackInput, { minHeight: 100 }]}
            placeholder={"Feedback..."}
          ></Input>
          <Button style={[styles.btn]}>
            <Text>Submit</Text>
          </Button>
        </Layout>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  heading: {
    marginVertical: 10,
    textAlign: "center",
  },
  carousel: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 10,
  },
  feedBack: {
    width: 320,
    marginTop: -10,

    height: 200,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  feedbackInput: {
    width: 320,
    maxHeight: 100,
    height: 50,
  },
  btn: {
    alignSelf: "center",
    width: 320,
    fontSize: 50,
    marginVertical: 10,
    borderColor: "black",
    backgroundColor: "#8AE78C",
  },
});

export default PatientDashboard;

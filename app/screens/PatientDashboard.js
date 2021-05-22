import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";

function PatientDashboard(props) {
  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  return (
    <ScrollView {...props}>
      <View style={styles.container} {...props}>
        <Text style={styles.heading} category="h3" {...props}>
          Dashboard
        </Text>
        <Input placeholder="Search" accessoryLeft={SearchIcon} />
        <Layout style={styles.carousel} level="4">
          <Text style={{ width: "100%", textAlign: "center" }}>Carousel</Text>
        </Layout>
        <Button style={styles.btn}>
          <Text>Book Appointment</Text>
        </Button>
        <Button style={[styles.btn,{marginBottom:20}]}>
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
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 200,
    marginVertical: 10,
  },
  feedBack: {
    width: "100%",
    borderTopColor: "black",
    borderTopWidth: 2,
    height: 200,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  feedbackInput: {
    width: "100%",
    maxHeight: 100,
    height: 50,
  },
  btn: {
    alignSelf: "center",
    width: "100%",
    fontSize: 50,
    marginVertical: 10,
  },
});

export default PatientDashboard;

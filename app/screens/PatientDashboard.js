import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import NewsCarousel from '../components/Carousel/NewsCarousel'

function PatientDashboard(props) {
  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  

  useEffect(() => {
    
  }, []);

  return (
    <ScrollView {...props}>
      <View style={styles.container} {...props}>
        <Text style={styles.heading} category="h3" {...props}>
          Dashboard
        </Text>
        <Input placeholder="Search" accessoryLeft={SearchIcon} />
        <View style={styles.carousel} >
          <NewsCarousel/>
        </View>
        <Button style={styles.btn}>
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
    flex:1,
    justifyContent: "center",
    alignContent:"center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 10,
  },
  feedBack: {
    width: 320,
    borderTopColor: "black",
    borderTopWidth: 2,
    height: 200,
    justifyContent: "center",
    alignContent:"center",
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
  },
});

export default PatientDashboard;

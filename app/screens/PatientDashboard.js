import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import NewsCarousel from "../components/Carousel/NewsCarousel";

function PatientDashboard(props) {

  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
      <Layout style={styles.container} {...props}>
    <ScrollView {...props}>
        <Button
          style={{
            textAlign: "left",
            width:"90%",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignSelf:"center",
          }}
          size="small"
          accessoryLeft={SearchIcon}
          appearance="outline"
          onPress={()=>props.navigation.navigate("Search")}
        >
          <Text>Search</Text>
        </Button>
        <Text style={styles.heading} category="h3" {...props}>
          Dashboard
        </Text>
        <View style={styles.carousel}>
          <NewsCarousel />
        </View>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Book")}
        >
          <Text>Book Appointment</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Appointments")}
        >
          <Text>View Appointment History</Text>
        </Button>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Profile")}
        >
          <Text>View Profile</Text>
        </Button>
    </ScrollView>
      </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignContent: "center",
    justifyContent: "center",
    flex:1,
  },
  heading: {
    marginVertical: 10,
    textAlign: "center",
  },
  carousel: {
    flex: 1,
    width:"100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 10,
  },
  btn: {
    flex:1,
    width:"90%",
    alignSelf: "center",
    fontSize: 50,
    marginVertical: 10,
  },
});

export default PatientDashboard;

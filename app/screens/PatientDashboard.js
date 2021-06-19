import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  useTheme,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react";
import NewsCarousel from "../components/Carousel/NewsCarousel";
import { useSelector } from "react-redux";
import MyCard from "../components/MyCard";

function PatientDashboard(props) {
  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  const theme = useTheme();

  // useEffect(() => {
  //   return () => {};
  // }, []);

  const appointments = useSelector((state) => state.appointments.data);

  const recentAppointments = appointments?.slice(0, 5);

  return (
    <Layout style={styles.container} {...props}>
      <ScrollView {...props}>
        <Text style={styles.heading} category="h4" {...props}>
          Dashboard
        </Text>
        <Divider
          style={{
            width: "50%",
            alignSelf: "center",
            height: 1.2,
            backgroundColor: theme["color-primary-500"],
          }}
        />
        <Button
          style={{
            textAlign: "left",
            width: "90%",
            alignContent: "flex-start",
            justifyContent: "flex-start",
            alignSelf: "center",
            marginVertical: 30,
          }}
          size="small"
          accessoryLeft={SearchIcon}
          appearance="outline"
          onPress={() => props.navigation.navigate("Search")}
        >
          <Text>Search</Text>
        </Button>
        <View style={styles.carousel}>
          <NewsCarousel />
        </View>
        <Button
          style={styles.btn}
          onPress={() => props.navigation.navigate("Search")}
        >
          Book Appointment
        </Button>
        {/* <Button
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
        </Button> */}
        <Layout style={{ paddingHorizontal: 10, marginVertical: 30 }}>
          <Text category="h6" style={{ fontWeight: "bold", marginBottom: 10 }}>
            Recent Appointments
          </Text>
          {recentAppointments?.map((app, index) => (
            <MyCard appointment={app} key={index} />
          ))}
        </Layout>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    marginVertical: 10,
    textAlign: "center",
  },
  carousel: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginVertical: 10,
    width: "100%",
    paddingHorizontal: 0,
  },
  btn: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    fontSize: 50,
    marginVertical: 10,
  },
});

export default PatientDashboard;

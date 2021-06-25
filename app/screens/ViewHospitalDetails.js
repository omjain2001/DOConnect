import { NavigationContainer } from "@react-navigation/native";
import { Card } from "@ui-kitten/components";
import {
  Icon,
  Layout,
  Text,
  useTheme,
  Divider,
  Avatar,
  Button,
} from "@ui-kitten/components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  View,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatientsInQueue,
  fetchTodaysAppointments,
} from "../redux/actions/appointmentActions";
import { SET_CURRENT_HOSPITAL } from "../redux/constants";

const DoctorCard = ({ profile }) => {
  const theme = useTheme();
  const { firstName, lastName, degree, specialization, profileImg } = profile;
  return (
    <TouchableOpacity
      onPress={() => console.log("View Doctor's Profile")}
      activeOpacity={0.5}
    >
      <Layout
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme["color-primary-800"],
          padding: 20,
          marginVertical: 10,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        {profileImg ? (
          <Avatar
            source={profileImg}
            size="giant"
            style={{ marginRight: 20 }}
          />
        ) : (
          <Layout
            style={{
              backgroundColor: "white",
              height: 60,
              width: 60,
              borderRadius: 30,
              marginRight: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text category="h6">
              {firstName[0].toUpperCase() + lastName[0].toUpperCase()}
            </Text>
          </Layout>
        )}
        <View
          style={{
            flexDirection: "column",
            flexShrink: 1,
          }}
        >
          <Text category="s1" style={{ color: "#fff", fontWeight: "bold" }}>
            {"Dr. " + firstName + " " + lastName}
          </Text>
          <Text category="c1" style={{ color: "#ffe8d6" }}>
            {specialization ? specialization : degree}
          </Text>
        </View>
      </Layout>
    </TouchableOpacity>
  );
};

const Info = ({ iconName, description }) => {
  return (
    <Layout
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <Icon name={iconName} fill="#000" style={{ height: 25, width: 25 }} />
      <Layout
        style={{
          flexShrink: 1,
        }}
      >
        <Text category="p1" style={{ paddingLeft: 15, lineHeight: 20 }}>
          {description}
        </Text>
      </Layout>
    </Layout>
  );
};

const Stats = ({ label, data }) => {
  const theme = useTheme();
  return (
    <Layout
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width / 3,
      }}
    >
      <Layout
        style={{
          height: Dimensions.get("window").width / 5,
          width: Dimensions.get("window").width / 5,
          borderRadius: Dimensions.get("window").width / 10,
          backgroundColor: theme["color-primary-800"],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text category="h5" style={{ color: "#fff", fontWeight: "bold" }}>
          {data >= 1000000
            ? data / 1000000 + "M"
            : data >= 1000
            ? data / 1000 + "K"
            : data}
        </Text>
      </Layout>
      <Text
        appearance="hint"
        // category="p2"
        style={{ fontWeight: "bold", marginVertical: 10, fontSize: 14 }}
      >
        {label}
      </Text>
    </Layout>
  );
};

const Labels = ({ title }) => {
  const theme = useTheme();

  return (
    <Layout>
      <Text category="h6" style={{ fontWeight: "bold" }}>
        {title}
      </Text>
      <Divider
        style={{
          width: "20%",
          height: 3,
          backgroundColor: theme["color-primary-500"],
          marginTop: 5,
        }}
      />
    </Layout>
  );
};

const ViewHospitalDetails = ({ navigation, route }) => {
  const theme = useTheme();
  const currentHospital = route.params.payload;

  const appointments = useSelector((state) => state.appointments);
  const hospital = useSelector((state) => state.hospitals);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const todaysDate = moment().format("DD/MM/YYYY");
    dispatch(fetchTodaysAppointments(currentHospital.UID, todaysDate));
    dispatch(fetchPatientsInQueue(currentHospital.UID, todaysDate));
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    const todaysDate = moment().format("DD/MM/YYYY");
    dispatch(fetchTodaysAppointments(currentHospital.UID, todaysDate));
    dispatch(fetchPatientsInQueue(currentHospital.UID, todaysDate));
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Layout
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          marginTop: StatusBar.currentHeight,
        }}
      >
        <Layout style={styles.headerContainer}>
          <Text category="h5" style={{ fontWeight: "bold" }}>
            {currentHospital && currentHospital.hospitalName}
          </Text>
          {currentHospital && currentHospital.tagline ? (
            <Text
              category="s1"
              appearance="hint"
              style={{ fontWeight: "bold", marginTop: 10, fontStyle: "italic" }}
              adjustsFontSizeToFit={true}
            >
              {currentHospital && currentHospital.tagline}
            </Text>
          ) : null}
        </Layout>
        <Divider
          style={{
            width: "50%",
            alignSelf: "center",
            height: 1,
            backgroundColor: theme["color-primary-500"],
            marginTop: 20,
          }}
        />
        <Layout style={{ marginVertical: 30 }}>
          <Labels title="Today's Stats" />
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginVertical: 30,
            }}
          >
            <Stats label="Appointments" data={appointments.total} />
            <Stats label="Queue" data={appointments.queue} />
            <Stats label="Examined" data={appointments.examined} />
          </Layout>
        </Layout>
        <Layout style={{ marginBottom: 30 }}>
          <Labels title="Doctors" />
          <Layout
            style={{
              marginVertical: 30,
            }}
          >
            {currentHospital && currentHospital.doctors.length > 0 ? (
              currentHospital.doctors.map((item, index) => (
                <DoctorCard profile={item} key={index} />
              ))
            ) : (
              <Text
                appearance="hint"
                category="h6"
                style={{ alignSelf: "center", fontWeight: "bold" }}
              >
                No Doctors
              </Text>
            )}
          </Layout>
        </Layout>
        <Layout style={{ marginBottom: 30 }}>
          <Labels title="Visit us at" />
          <Layout
            style={{
              marginVertical: 30,
            }}
          >
            <Info iconName="pin" description={currentHospital.address} />
            <Info iconName="clock" description="10:00 AM - 9:00 PM" />
            <Info
              description={
                currentHospital.telephone ? currentHospital.telephone : "-"
              }
              iconName="phone"
            />
            <Info
              description={currentHospital.phone ? currentHospital.phone : "-"}
              iconName="phone"
            />
          </Layout>
        </Layout>
        <Button
          onPress={() => navigation.navigate("BookAppointment")}
          size="large"
        >
          Book Appointment
        </Button>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ViewHospitalDetails;

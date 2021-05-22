import {
  Icon,
  Layout,
  Text,
  useTheme,
  Divider,
  Avatar,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const DoctorCard = ({ profile }) => {
  const theme = useTheme();
  const { name, designation, avatar } = profile;
  return (
    <TouchableOpacity
      onPress={() => console.log("View Doctor's Profile")}
      activeOpacity={0.1}
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
        <Avatar source={avatar} size="giant" style={{ marginRight: 20 }} />
        <Layout
          style={{
            flexDirection: "column",
            backgroundColor: theme["color-primary-800"],
            flexShrink: 1,
          }}
        >
          <Text category="s1" style={{ color: "#fff", fontWeight: "bold" }}>
            {"Dr. " + name}
          </Text>
          <Text category="c1" style={{ color: "#ffe8d6" }}>
            {designation}
          </Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

const Info = ({ iconName, description }) => {
  const theme = useTheme();

  return (
    <Layout
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
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

const doctorList = [
  {
    name: "Alex Johnson",
    designation: "M.B.B.S MD Medicine Physician",
    avatar: require("../../assets/doctor1.jpg"),
  },
  {
    name: "John Smith",
    designation: "MBBS MD Medicine PGDGM HIV Medicine",
    avatar: require("../../assets/doctor3.png"),
  },
  {
    name: "Jiya Mehta",
    designation: "MBBS, MD, FIPM",
    avatar: require("../../assets/doctor5.png"),
  },
  {
    name: "C. K. Puranik",
    designation: "General Physician",
    avatar: require("../../assets/doctor4.png"),
  },
  {
    name: "Shyam Kagal",
    designation: "M.D.",
    avatar: require("../../assets/doctor6.png"),
  },
];

const ViewHospitalDetails = () => {
  const theme = useTheme();

  //TODO assign different font to tagline

  return (
    <ScrollView>
      <Layout style={{ marginTop: 50 }}>
        <Layout style={styles.headerContainer}>
          <Text category="h5" style={{ fontWeight: "bold" }}>
            Mankind Medicare
          </Text>
          <Text
            category="s1"
            appearance="hint"
            style={{ fontWeight: "bold", marginTop: 10 }}
          >
            24/7 we here for you
          </Text>
        </Layout>
        <Divider
          style={{
            width: "50%",
            alignSelf: "center",
            height: 1,
            backgroundColor: theme["color-primary-500"],
            marginTop: 40,
          }}
        />
        <Layout style={{ paddingHorizontal: 10 }}>
          <Text
            category="h6"
            style={{
              fontWeight: "bold",
              marginTop: 30,
              marginBottom: 10,
              alignSelf: "center",
            }}
          >
            Doctors
          </Text>
          {doctorList.map((item, index) => (
            <DoctorCard profile={item} key={index} />
          ))}
        </Layout>
        <Divider
          style={{
            width: "50%",
            alignSelf: "center",
            height: 1,
            backgroundColor: theme["color-primary-500"],
            marginTop: 50,
          }}
        />
        <Layout
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 50,
          }}
        >
          <Text
            category="h6"
            style={{ fontWeight: "bold", marginTop: 30, alignSelf: "center" }}
          >
            Visit us at
          </Text>
          <Info
            iconName="pin"
            description="Ganga Preet Cooperative Housing Society, Bunglow No 11 Defense Officers, Seasons Rd, behind Medipoint Hospital, Oriental Gold Society, Aundh, Pune, Maharashtra 411007"
          />
          <Info iconName="clock" description="10:00 AM - 9:00 PM" />
          <Info description="02572254265, 02572654879" iconName="phone" />
          <Info description="9860938511" iconName="phone" />
        </Layout>
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

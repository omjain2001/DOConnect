import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import "react-native-gesture-handler";

import { Button } from "react-native-elements";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";

const globaloptions = {
  headerStyle: { backgroundColor: "dodgerblue" },
  headerTitleStyle: { color: "white" },
};
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
export default function EdiprofilePatient({ navigation }) {
  const [fname, setfname] = React.useState("");
  const [lname, setlname] = React.useState("");
  const [age, setage] = React.useState(null);
  const [email, setemail] = React.useState("");
  const [male, setmale] = React.useState(false);
  const [female, setfemale] = React.useState(false);
  const [phone, setphone] = React.useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#E9E9E9",
      }}
    >
      <View
        style={{
          height: 300,
          width: "95%",
          backgroundColor: "#0CA789",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: 10,
          borderRadius: 15,
        }}
      >
        <Image
          style={{ height: 150, width: 150, borderRadius: 75, marginTop: 5 }}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRquOidLbh7t0vls1xvjVObPm88QM7NoOXEUQ&usqp=CAU",
          }}
        />
        <Text style={{ fontSize: 18, marginTop: 15 }}>Patient name</Text>
      </View>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          height: "65%",
          width: "87",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 1.6,
          shadowRadius: 4.65,

          elevation: 10,
          marginTop: -40,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <SafeAreaView>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              Edit User Profile
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <FontAwesome5
                style={{
                  padding: 10,
                  marginRight: -40,
                  color: "#0CA789",
                }}
                name="user-injured"
                size={24}
                color="black"
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 270,
                  textAlign: "center",
                }}
                onChangeText={(text) => setfname(text)}
                value={fname}
                placeholder="Enter first name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <FontAwesome5
                style={{
                  padding: 10,
                  marginRight: -40,
                  color: "#0CA789",
                }}
                name="user-injured"
                size={24}
                color="black"
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 270,
                  textAlign: "center",
                }}
                onChangeText={(text) => setlname(text)}
                value={lname}
                placeholder="Enter last name"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <AntDesign
                style={{
                  padding: 10,
                  marginRight: -40,
                  color: "#0CA789",
                }}
                name="user"
                size={24}
                color="black"
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 270,
                  textAlign: "center",
                }}
                onChangeText={(text) => setage(text)}
                value={age}
                placeholder="Enter your age"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                flex: 1,
              }}
            >
              <MaterialIcons
                style={{ padding: 10, marginRight: -40, color: "#0CA789" }}
                name="email"
                size={24}
                color="black"
              />
              <TextInput
                style={{
                  flex: 1,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 0,
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 270,
                  textAlign: "center",
                }}
                inputStyle={{ marginLeft: 50 }}
                textAlign={"center"}
                onChangeText={(text) => setemail(text)}
                value={email}
                placeholder="Enter your email address"
              />
            </View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginBottom: -20,
                marginTop: 10,
                marginLeft: 100,
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Male</Text>
              <Switch
                style={{ marginLeft: 20 }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={male ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setmale(!male), setfemale(false);
                }}
                value={male}
              />
              <Text style={{ marginLeft: 20 }}>Female</Text>
              <Switch
                style={{ marginLeft: 20 }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={female ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  setmale(false), setfemale(!female);
                }}
                value={female}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                alignItems: "center",
              }}
            >
              <MaterialIcons
                style={{ padding: 10, marginRight: -40, color: "#0CA789" }}
                name="perm-contact-cal"
                size={24}
                color="black"
              />
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 30,
                  width: 270,
                  textAlign: "center",
                }}
                onChangeText={(text) => setphone(text)}
                value={phone}
                placeholder="Enter your contact number"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#0CA789",
                marginTop: 30,
                height: 50,
                marginBottom: 30,
                borderRadius: 25,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0,
  },
  body: {
    flex: 1,
    alignItems: "flex-start",
    height: 20,
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
    padding: 10,
    width: "50%",
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function DoctorProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: "data:image/jpeg;base64,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",
          }}
        />
      </View>
      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Ms. Aditi Kunte
        </Text>
        <Text style={{ color: "#B7BAC8", fontWeight: "bold", fontSize: 16 }}>
          Heart Specilist
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#B7BAC8",
          marginTop: 40,
          width: "100%",
        }}
      />
      <ScrollView>
        <View
          style={{
            paddingVertical: 25,
            width: "100%",
            flexDirection: "column",
            paddingHorizontal: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#12C0B4",
                borderRadius: 20,
                height: 40,
                width: 40,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="user" size={24} color="white" />
            </View>
            <Text style={{ fontSize: 19, marginLeft: 17, fontWeight: "bold" }}>
              About Me
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 20,
              backgroundColor: "white",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRadius: 15,
              shadowColor: "#202020",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 15 }}>
              A physician, medical practitioner, medical doctor, or simply
              doctor, is a professional who practices medicine, which is
              concerned with promoting, maintaining, or restoring health through
              the study, diagnosis, prognosis and treatment of disease, injury,
              and other physical and mental impairments.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#12C0B4",
                borderRadius: 20,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="graduation-cap" size={24} color="white" />
            </View>
            <Text style={{ fontSize: 19, marginLeft: 17, fontWeight: "bold" }}>
              Degree
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,

              width: "100%",

              paddingHorizontal: 10,
              borderRadius: 15,
            }}
          >
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: "white",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 10,
                borderRadius: 15,
                shadowColor: "#202020",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Heart Specilist
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#12C0B4",
                borderRadius: 20,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="briefcase-medical" size={24} color="white" />
            </View>
            <Text style={{ fontSize: 19, marginLeft: 17, fontWeight: "bold" }}>
              Specialization
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 20,
              backgroundColor: "white",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRadius: 15,
              shadowColor: "#202020",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 15 }}>
              You may call them simply doctors. But most doctors have extra
              expertise in one type of medicine or another. In fact, there are
              several hundred medical specialties and subspecialties. Here are
              the most common types of doctors you'll likely see.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                backgroundColor: "#12C0B4",
                borderRadius: 20,
                height: 40,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="hospital-marker"
                size={24}
                color="white"
              />
            </View>
            <Text style={{ fontSize: 19, marginLeft: 17, fontWeight: "bold" }}>
              Hospital
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 20,
              backgroundColor: "white",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              borderRadius: 15,
              shadowColor: "#202020",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Apolo Hosiptal
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 20,
              paddingHorizontal: -10,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: "#E2F9F7",
                height: 90,
                width: 90,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                shadowColor: "#202020",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{ fontSize: 25, color: "#4EB4A6", fontWeight: "bold" }}
              >
                162
              </Text>
              <Text style={{ fontSize: 16 }}>Patients</Text>
            </View>
            <View
              style={{
                backgroundColor: "#E2F9F7",
                height: 90,
                width: 90,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                shadowColor: "#202020",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{ fontSize: 25, color: "#4EB4A6", fontWeight: "bold" }}
              >
                4.5
              </Text>
              <Text style={{ fontSize: 16 }}>Rating</Text>
            </View>
            <View
              style={{
                backgroundColor: "#E2F9F7",
                height: 90,
                width: 90,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
                shadowColor: "#202020",
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
                elevation: 5,
              }}
            >
              <Text
                style={{ fontSize: 25, color: "#4EB4A6", fontWeight: "bold" }}
              >
                34
              </Text>
              <Text style={{ fontSize: 16 }}>Age</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",

    flexDirection: "column",
    backgroundColor: "#F2F7FD",
    paddingHorizontal: 10,
  },
  header: {
    height: "35%",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
    position: "absolute",
    bottom: 0,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "white",
  },
});

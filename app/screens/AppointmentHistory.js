import React from "react";
import {  StyleSheet, Image } from "react-native";
import {  Layout, Text, Card } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import MyCard from "../components/MyCard";

//Custom Hook
const useAppointmentStatus = (status) => {
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eos dignissimos nesciunt aliquam laborum minima illum quo culpa? Doloremque possimus eveniet quos ut voluptates corporis minus atque aut. Non, reprehenderit.";

  const [appointments, setappointments] = useState([
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"1",
      status: "pending",
      due: "12/12/2012",
      telephone: "123456789",
    },
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"2",
      status: "completed",
      due: "12/12/2012",
      telephone: "123456789",
    },
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"3",
      status: "pending",
      due: "12/12/2012",
      telephone: "123456789",
    },
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"4",
      status: "completed",
      due: "12/12/2012",
      telephone: "123456789",
    },
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"5",
      status: "pending",
      due: "12/12/2012",
      telephone: "123456789",
    },
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"6",
      status: "completed",
      due: "12/12/2012",
      telephone: "123456789",
    },
    {
      name: "HealthLine Clinic",
      issue: lorem,
      id:"7",
      status: "pending",
      due: "12/12/2012",
      telephone: "123456789",
    },
  ]);

  return appointments.filter((appointment) => appointment.status === status);
};


//Pending Appointments
export function PendingAppointments(props) {
  const appointments = useAppointmentStatus("pending");

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layout style={styles.container} {...props}>
        {appointments.map((appointment) => (
          <MyCard key={appointment.id} appointment={appointment}/>
        ))}
      </Layout>
    </ScrollView>
  );
}

//Completed Appointmenst
export function CompletedAppointments(props) {
  const appointments = useAppointmentStatus("completed");

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layout style={styles.container} {...props}>
        {appointments.map((appointment) => (
          <MyCard key={appointment.id} appointment={appointment}/>
        ))}
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
});

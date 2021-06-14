import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointments } from "../redux/actions/appointmentActions";

function AppointmentHistory(props) {
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eos dignissimos nesciunt aliquam laborum minima illum quo culpa? Doloremque possimus eveniet quos ut voluptates corporis minus atque aut. Non, reprehenderit.";

  const [visible, setvisible] = useState(false);

  const [activeCard, setactiveCard] = useState({
    hosp_name: "Mayur",
    issue: lorem,
    due: "12/12/2012",
    avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  });

  // const [appointments, setappointments] = useState([
  //   {
  //     name: "Mayur",
  //     issue: lorem,
  //     due: "12/12/2012",
  //     avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  //   },
  //   {
  //     name: "Siddhesh",
  //     issue: lorem,
  //     due: "12/12/2012",
  //     avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  //   },
  //   {
  //     name: "Om",
  //     issue: lorem,
  //     due: "12/12/2012",
  //     avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  //   },
  //   {
  //     name: "Amey",
  //     issue: lorem,
  //     due: "12/12/2012",
  //     avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  //   },
  //   {
  //     name: "Shardul",
  //     issue: lorem,
  //     due: "12/12/2012",
  //     avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  //   },
  // ]);

  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments("iZUjekN5AXhD1DHbV6c2"));
  }, []);

  return appointments.filter((appointment) => appointment.status === status);
}

//Pending Appointments
export function PendingAppointments(props) {
  const appointments = useAppointmentStatus("pending");

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layout style={styles.container} {...props}>
        {appointments.map((appointment) => (
          <MyCard key={appointment.id} appointment={appointment} />
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
          <MyCard key={appointment.id} appointment={appointment} />
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

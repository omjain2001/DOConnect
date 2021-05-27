import React from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  Modal,
  Text,
} from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";



function AppointmentHistory(props) {
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eos dignissimos nesciunt aliquam laborum minima illum quo culpa? Doloremque possimus eveniet quos ut voluptates corporis minus atque aut. Non, reprehenderit.";

  const [visible, setvisible] = useState(false);

  const [activeCard, setactiveCard] = useState({
    name: "Mayur",
    issue: lorem,
    due: "12/12/2012",
    avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
  });

  const [appointments, setappointments] = useState([
    {
      name: "Mayur",
      issue: lorem,
      due: "12/12/2012",
      avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
    },
    {
      name: "Siddhesh",
      issue: lorem,
      due: "12/12/2012",
      avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
    },
    {
      name: "Om",
      issue: lorem,
      due: "12/12/2012",
      avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
    },
    {
      name: "Amey",
      issue: lorem,
      due: "12/12/2012",
      avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
    },
    {
      name: "Shardul",
      issue: lorem,
      due: "12/12/2012",
      avatar: "https://image.flaticon.com/icons/png/512/3135/3135768.png",
    },
  ]);

  return (
    <ScrollView {...props}>
      <View style={styles.container} {...props}>
        <Text style={{ top: 0, textAlign: "center" }} category="h3" {...props}>
          Appointments
        </Text>
        {appointments.map((appointment, index) => (
          <Card
            key={index}
            status={"primary"}
            style={{
              marginVertical: 10,
              padding: 0,
              height: 100,
              width: 320,
            }}
            onPress={() => {
              setvisible(true);
              setactiveCard(appointment);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Avatar source={{ uri: appointment.avatar }}></Avatar>
              </View>
              <View
                style={{ alignItems: "flex-start", flex: 4, paddingLeft: 10 }}
              >
                <Text>{"Name: " + appointment.name}</Text>
                <Text numberOfLines={2}>{"Issue: " + appointment.issue}</Text>
                <Text>{"Due: " + appointment.due}</Text>
              </View>
            </View>
          </Card>
        ))}
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onBackdropPress={() => setvisible(false)}
        >
          <Card
            {...props}
            style={{
              width: 300,
              height: "100%",
              borderRadius: 10,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                alignSelf: "center",
              }}
              source={{ uri: activeCard.avatar }}
            ></Image>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              {"Name"}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              {activeCard.name}
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              {"Issue"}
            </Text>
            <Text numberOfLines={5} style={{ textAlign: "left", fontSize: 20 }}>
              {activeCard.issue}
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text
              style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              {"Date"}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              {activeCard.due}
            </Text>
            <Divider style={{ marginVertical: 10 }} />
            <Button {...props} onPress={()=>setvisible(false)} >Close</Button>
          </Card>
        </Modal>
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
});

export default AppointmentHistory;

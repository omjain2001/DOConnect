import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Icon, Input, Layout, Text } from "@ui-kitten/components";
import { ScrollView } from "react-native-gesture-handler";
import AppoinmentCard from "./AppoinmentCard";

function DoctorDashboard(props) {
  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  let doctorName = "Siddhesh";

  const appointmentData = [
    {
      id: '1',
      firstname:"Siddhesh",
      lastName:"Dhainje",
      age:"19",
      phone:"4578965412",
      date:"21/06/21",
      time:"5:00PM"
    },
    {
      id: '2',
      firstname:"Siddhesh",
      lastName:"Dhainje",
      age:"19",
      phone:"4578965412",
      date:"21/06/21",
      time:"5:00PM"
    },
    {
      id: '3',
      firstname:"Siddhesh",
      lastName:"Dhainje",
      age:"19",
      phone:"4578965412",
      date:"21/06/21",
      time:"5:00PM"
    },
    ,
    {
      id: '4',
      firstname:"Siddhesh",
      lastName:"Dhainje",
      age:"19",
      phone:"4578965412",
      date:"21/06/21",
      time:"5:00PM"
    },
    ,
    {
      id: '5',
      firstname:"Siddhesh",
      lastName:"Dhainje",
      age:"19",
      phone:"4578965412",
      date:"21/06/21",
      time:"5:00PM"
    },
    ,
    {
      id: '6',
      firstname:"Siddhesh",
      lastName:"Dhainje",
      age:"19",
      phone:"4578965412",
      date:"21/06/21",
      time:"5:00PM"
    },
  ];

  return (
    
      <View style={styles.container} {...props}>
          <Text style={styles.headingHospital} category="h2" {...props}>
            Surya Hospital
          </Text>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.heading} category="h4" {...props}>
            Hi, {doctorName}
          </Text>
          <Icon
            style={{
              width: 32,
              height: 32,
              marginVertical: 8,
              textAlign: "right",
            }}
            fill="#8F9BB3"
            name="search-outline"
          />
        </View>

        {/* <Input placeholder="Search" accessoryLeft={SearchIcon} /> */}
        <Layout style={styles.carousel} level="4">
          <Text style={{ width: "100%", textAlign: "center" }}>Carousel</Text>
        </Layout>
        <Layout><Text>Today's Appoinments</Text></Layout>
        <ScrollView {...props}>
        <Layout style={{

        }} level="1">
          {/* <FlatList
            data={appointmentData}
            keyExtractor={item =>item.id}
            renderItem={<AppoinmentCard data={appointmentData}/>}
          /> */}
          <AppoinmentCard/>
          <AppoinmentCard/>
          <AppoinmentCard/>
          <AppoinmentCard/>
          <AppoinmentCard/>
          <AppoinmentCard/>
          
        </Layout>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  headingHospital: {
    marginVertical: 10,
    textAlign: "center",
  },
  heading: {
    marginVertical: 4,
    textAlign: "left",
  },
  carousel: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 200,
    marginVertical: 10,
  },
  feedBack: {
    width: "100%",
    borderTopColor: "black",
    borderTopWidth: 2,
    height: 200,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  feedbackInput: {
    width: "100%",
    maxHeight: 100,
    height: 50,
  },
  btn: {
    alignSelf: "center",
    width: "100%",
    fontSize: 50,
    marginVertical: 10,
  },
});

export default DoctorDashboard;

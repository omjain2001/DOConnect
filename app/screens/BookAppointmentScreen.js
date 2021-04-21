import React from "react";
import {View,StyleSheet} from "react-native";
import { Button, Input , Datepicker, Text, RadioGroup, Radio, Icon} from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";

import ErrorMsg from "../components/ErrorMsg";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required("Please Enter your First Name.").label(),
  LastName: Yup.string().required("Please Enter your Last Name.").label(),
  ContactNo: Yup.number().typeError().positive().integer().min(8).required("Please Enter your Contact number.").label(),
  Age: Yup.number().required().positive().integer("Please enter your Age").label(),
  Gender: Yup.string().required("Please select Gender").label(),
});

function BookAppointmentScreen(props) {
  const onRegister = () => {
    try {
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const Gender=["Male","Female","Others"];

  const [date, setDate] = React.useState(new Date());

  const CalendarIcon = (props) => (
    <Icon {...props} name='calendar'/>
  )

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading} category="h3" {...props} >Book Appointment</Text>
          <Formik
            initialValues={{
              FirstName: "",
              LastName: "",
              ContactNo: "",
              Age: "",
              Gender: Gender[selectedIndex],
              Symptoms: "",
              AppointmentDate: date.toLocaleDateString(), 
            }}
            onSubmit={onRegister}
            validationSchema={validationSchema}>
            {({ handleChange, handleSubmit, errors }) => (
              <>
                  <View style={styles.formContainer}>
                      
                      <Input style={styles.inputFields}
                          label="First Name"
                          placeholder="Enter your First Name"
                          onChangeText={handleChange("FirstName")}
                      />
                      <ErrorMsg>{errors.FirstName}</ErrorMsg>
                      <Input style={styles.inputFields}
                          label="Last Name"
                          placeholder="Enter your Last name"
                          onChangeText={handleChange("LastName")}
                      />
                      <ErrorMsg>{errors.LastName}</ErrorMsg>
                      <Input style={[styles.inputFields]}
                          label="Contact Number"
                          placeholder="Enter your Mobile Number"
                          onChangeText={handleChange("ContactNo")}
                      />
                      <ErrorMsg>{errors.ContactNo}</ErrorMsg>
                      <Input style={styles.inputFields}
                          label="Age"
                          placeholder="Enter your Age"
                          onChangeText={handleChange("Age")}
                      />
                      <ErrorMsg>{errors.Age}</ErrorMsg>
                      <View style={[styles.inputFields]}>
                          <Text appearance="hint" style={{fontSize:12}}>
                              Gender
                          </Text>
                          <RadioGroup
                                style={{flex:9, flexDirection:"row"}}
                                selectedIndex={selectedIndex}
                                onChange={index => setSelectedIndex(index)}>
                              <Radio style={{flex:3}}>Female</Radio>
                              <Radio style={{flex:3}}>Male</Radio>
                              <Radio style={{flex:3}}>Other</Radio>
                          </RadioGroup>
                      </View>
                      <ErrorMsg>{errors.Gender}</ErrorMsg>
                      <View style={[styles.inputFields, {marginBottom:15}]}>
                        <Text appearance="hint" style={{fontSize:12}}>
                          Select Appointment date
                        </Text>
                        <Datepicker
                          accessoryRight={CalendarIcon}
                          date={date}
                          onSelect={nextDate => setDate(nextDate)}
                        />
                      </View>
                      <Input
                          multiline={true}
                          textStyle={[styles.inputFields,{ minHeight:70, marginBottom:30, width:320 }]}
                          label="Symptoms"
                          placeholder="Enter Symptoms you are having"
                          onChangeText={handleChange("Symptoms")}
                      />
                  </View>
                  
                  <Button
                      style={styles.btns}
                      onPress={handleSubmit}>
                      Submit
                  </Button>
              </>
            )}
          </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical:50,
    marginHorizontal:20,
  },
  formContainer:{
    
  },
  heading:{
    top:-30,
    textAlign:"center",
  },
  inputFields: {
    width:320,
  },
  btns: {
    marginTop:20,
    width:320,
    alignSelf:"center",
  },
});

export default BookAppointmentScreen;

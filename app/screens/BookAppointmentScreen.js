import React from "react";
import {View,StyleSheet} from "react-native";
import { Button, Input , Layout , Datepicker, Text, RadioGroup, Radio} from "@ui-kitten/components";
import { Formik } from "formik";
import * as Yup from "yup";

import ErrorMsg from "../components/ErrorMsg";
import { ScrollView } from "react-native-gesture-handler";

const validationSchema = Yup.object().shape({
  FirstName: Yup.string().required().label("FirstName"),
  LastName: Yup.string().required().label("LastName"),
  ContactNo: Yup.number().typeError().positive().integer().min(8).required().label("ContactNo"),
  Age: Yup.number().required().positive().integer().label("Age"),
});

function BookAppointmentScreen(props) {
  const onRegister = () => {
    try {
      console.log("Done");
    } catch (error) {
      console.log(error);
    }
  };

  const [date, setDate] = React.useState(new Date());

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading} category="h2" {...props} >Book {"\n"} Appointment</Text>
        <Formik
          initialValues={{
            FirstName: "",
            LastName: "",
            ContactNo: "",
            Age: "",
            Gender: "",
            Symptoms: "", 
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

                    <Layout style={[styles.inputFields]} level='1'>
                        <Text appearance="hint" style={{fontSize:12}}>
                            Date Of Birth
                        </Text>
                        <Datepicker
                            style={{alignSelf:"stretch"}}
                            date={date}
                            onSelect={nextDate => setDate(nextDate)}
                        />
                    </Layout>

                    <Layout style={[styles.inputFields]} level='1'>
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
                    </Layout>

                <Input
                    multiline={true}
                    style={[styles.inputFields,{maxHeight:100, marginBottom:30}]}
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
      marginVertical:100,
      marginHorizontal:20,
    },
  formContainer:{
    
  },
  heading:{
    top:-50,
    textAlign:"center",
  },
  inputFields: {
   width:300,
  },
  btns: {
    marginTop:20,
    width:150,
    alignSelf:"center",
  },
});

export default BookAppointmentScreen;

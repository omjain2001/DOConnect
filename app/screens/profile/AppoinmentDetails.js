import { Button, Layout, Text } from '@ui-kitten/components';
import React from 'react'
import { View, StyleSheet, FlatList } from "react-native";
import PatientSVG from '../Icons/PatientSVG'

const AppoinmentDetails = () => {
    return (
        <Layout style={styles.container}>
            <Layout style={{
                justifyContent:"center",
                alignItems:"center",
                marginTop:"20%"
            }}>
                <PatientSVG/>
            </Layout>
            <Layout style={{
                marginTop:"10%",
                marginLeft:"10%",
            }}>
                <Text style={styles.textStyle} >Name: Siddhesh Dhainje</Text>
                <Text style={styles.textStyle}>Phone: 4578965478</Text>
                <Text style={styles.textStyle}>Address: Pune jare icon </Text>
                <Text style={styles.textStyle}>Age: 19</Text>
                <Text style={styles.textStyle}>Gender: Male</Text>
                <Text style={styles.textStyle}>Height: 172CM </Text>
                <Text style={styles.textStyle}>Weight: 75KG</Text>
                <Text style={styles.textStyle}>Symptoms: Fever,cold etc</Text>
                <Text style={styles.textStyle}>Date: 24/05/2021</Text>
            </Layout>
            <Layout style={{
                marginTop:"10%",
                justifyContent:"center",
                alignItems:"center"
                }}>
                <Button style={styles.btn}>Accept</Button>
                <Button status="danger" style={styles.btn}>Decline</Button>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
    },
    textStyle:{
        fontSize:20,
        marginBottom:8
    },
    btn:{
      width: "80%",
      margin: "2%"
    }
  });
export default AppoinmentDetails

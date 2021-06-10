import { Layout,Text } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'

const AppoinmentCard = ({data}) => {
    return (
        <Layout level="4" style={{
            marginTop:"1%",
        }}>
            <Layout level="4" style={{
                flexDirection:"row",
                justifyContent:"space-between",
                paddingLeft: "5%",
                paddingRight:"5%",
                paddingTop:"5%"
            }}>
                <Text>Name Siddhesh Dhainje</Text>
                <Text> Age 19</Text>
            </Layout>
            <Layout level="4" style={{
                flexDirection:"row",
                justifyContent:"space-between",
                paddingLeft: "5%",
                paddingRight:"5%"
            }}>
                <Text>Phone 02457891357</Text>
                <Text>Gender Male</Text>
                
            </Layout>
            <Layout level="4" style={{
                flexDirection:"row",
                justifyContent:"space-between",
                paddingLeft: "5%",
                paddingRight:"5%",
                paddingBottom:"5%"
            }}>
                <Text>Time 3:00PM</Text>
                <Text>Date 12/06/21</Text>
            </Layout>
        </Layout>
    )
}

export default AppoinmentCard

import { Card } from '@ui-kitten/components';
import { Layout, Text, Divider } from '@ui-kitten/components'
import React from 'react'

const MyCard = ({appointment})=>{
    return(
    <Card
      header={()=>(
        <Layout style={{padding:10}}>
          <Text category="h6">{appointment.name}</Text>
        </Layout>
      )}
      footer={()=>(
        <Layout style={{padding:10}}>
          <Text appearance="hint" category="p1">{`id:${appointment.id}`}</Text>
        </Layout>
      )}
      status={appointment.status === "completed" ? "success" : "danger"}
      style={{
        marginVertical: 10,
        padding: 0,
        width: "100%",
      }}
    >
      <Layout>
        <Text category='s1' >{`Telephone No. :${appointment.telephone}`}</Text>
        <Text category='s1' >{`Appointment Date :${appointment.due}`}</Text>
      </Layout>
    </Card>)
  }

export default MyCard;

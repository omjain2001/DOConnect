import { Card } from "@ui-kitten/components";
import { Layout, Text, Divider } from "@ui-kitten/components";
import React from "react";
import { APPOINTMENT_STATUS } from "../redux/constants";

const MyCard = ({ appointment }) => {
  return (
    <Card
      header={() => (
        <Layout style={{ padding: 10, alignItems: "center" }}>
          <Text category="h6" style={{ fontWeight: "bold" }}>
            {appointment.hospital.hospitalName}
          </Text>
        </Layout>
      )}
      // footer={() => (
      //   <Layout style={{ padding: 10 }}>
      //     <Text appearance="hint" category="p1">{`id:${appointment.id}`}</Text>
      //   </Layout>
      // )}
      status={
        appointment.status === APPOINTMENT_STATUS.COMPLETED
          ? "success"
          : "warning"
      }
      style={{
        marginVertical: 10,
        padding: 0,
        width: "100%",
        elevation: 3,
      }}
    >
      <Text category="s1">{`Telephone No. :${appointment.hospital.telephone}`}</Text>
      <Text category="s1">{`Appointment Date :${appointment.appointmentDate}`}</Text>
    </Card>
  );
};

export default MyCard;

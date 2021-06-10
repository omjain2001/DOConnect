import { Card, Input, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInitialHospitals,
  fetchMoreHospitals,
  searchHospitals,
} from "../redux/actions/hospitalActions";

const HospitalCard = ({ item }) => {
  return (
    <Card
      header={(props) => <Text {...props}>{item.hospitalName}</Text>}
      style={{ marginVertical: 20 }}
    >
      <Text appearance="hint">{item.address}</Text>
    </Card>
  );
};

const TestSearchScreen = () => {
  useEffect(() => {
    dispatch(fetchInitialHospitals());
  }, []);
  const hospitals = useSelector((state) => state.hospitals);
  const dispatch = useDispatch();

  let onEndReachedCalledDuringMomentum = false;

  const [refreshing, setRefreshing] = useState(false);

  const handleChange = (value) => {
    console.log("Running");
    dispatch(searchHospitals(value.toLowerCase()));
  };

  return (
    <Layout style={{ alignItems: "center" }}>
      <Input
        placeholder="Search for hospitals"
        onChangeText={(value) => handleChange(value)}
        style={{ width: "80%", marginVertical: 20, padding: 10 }}
      />
      <FlatList
        data={hospitals.data}
        renderItem={({ item }) => <HospitalCard item={item} />}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          dispatch(fetchInitialHospitals());
          setRefreshing(false);
        }}
        keyExtractor={(item) => item.UID.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            if (hospitals.canLoadMore) {
              dispatch(fetchMoreHospitals());
              onEndReachedCalledDuringMomentum = true;
            }
          }
        }}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
      />
    </Layout>
  );
};

export default TestSearchScreen;

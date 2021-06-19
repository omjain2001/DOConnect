import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Spinner,
  Text,
} from "@ui-kitten/components";
import { create } from "apisauce";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../auth/firebase";
import moment from "moment";
import {
  fetchPatientsInQueue,
  fetchTodaysAppointments,
} from "../redux/actions/appointmentActions";
import {
  fetchInitialHospitals,
  fetchMoreHospitals,
  searchHospitals,
} from "../redux/actions/hospitalActions";
import { COLLECTION, SET_CURRENT_HOSPITAL } from "../redux/constants";

function SearchScreen({ navigation, props }) {
  const [Search, setSearch] = useState("");

  const dispatch = useDispatch();

  const hospitals = useSelector((state) => state.hospitals);

  useEffect(() => {
    dispatch(fetchInitialHospitals());
    dispatch({
      type: SET_CURRENT_HOSPITAL,
      payload: null,
    });
  }, []);

  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  const handlePress = async (item) => {
    try {
      dispatch(
        fetchTodaysAppointments(item.UID, moment().format("DD/MM/YYYY"))
      );
      dispatch(fetchPatientsInQueue(item.UID, moment().format("DD/MM/YYYY")));
      let doctorArr = [];
      item.doctorsRef.forEach((doc) =>
        doctorArr.push(firestore.collection(COLLECTION.DOCTOR).doc(doc).get())
      );

      doctorArr = await Promise.all(doctorArr);

      const payload = {
        ...item,
        doctors: doctorArr.map((doc) => doc.data()),
      };

      dispatch({
        type: SET_CURRENT_HOSPITAL,
        payload,
      });
      navigation.navigate("HospitalDetails", { payload });
    } catch (error) {
      console.log(error.message);
    }
  };

  const RenderItemAccessory = ({ item }) => (
    <Button size="small" onPress={() => handlePress(item)}>
      VISIT
    </Button>
  );
  const renderItem = ({ item, index }) => (
    <ListItem
      title={<Text category="h6">{item.hospitalName}</Text>}
      onPress={() => handlePress(item)}
      description={
        <Text appearance="hint" category="p1">
          {item.address}
        </Text>
      }
      accessoryRight={(props) => <RenderItemAccessory item={item} {...props} />}
    />
  );

  let onEndReachedCalledDuringMomentum = false;

  const [refreshing, setRefreshing] = useState(false);

  return (
    <Layout style={styles.container} {...props}>
      <Layout style={{ flex: 1, zIndex: 99 }}>
        <Input
          accessoryLeft={SearchIcon}
          placeholder={"Search Hospitals"}
          value={Search}
          onChangeText={(value) => {
            setSearch(value);
            if (value !== "") {
              dispatch(searchHospitals(value.toLowerCase()));
            } else {
              dispatch(fetchInitialHospitals());
            }
          }}
        ></Input>
      </Layout>
      <Layout style={{ flex: 10 }}>
        {/* <List
          data={hospitals.data}
          ItemSeparatorComponent={Divider}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        /> */}
        <FlatList
          data={hospitals.data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            dispatch(fetchInitialHospitals());
            setRefreshing(false);
          }}
          keyExtractor={(item) => item.UID.toString()}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum && Search === "") {
              if (hospitals.canLoadMore) {
                dispatch(fetchMoreHospitals());
                onEndReachedCalledDuringMomentum = true;
              }
            }
          }}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum = false;
          }}
          ListFooterComponent={() =>
            hospitals.isMoreLoading && (
              <Spinner size="giant" style={{ justifyContent: "center" }} />
            )
          }
          ListFooterComponentStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default SearchScreen;

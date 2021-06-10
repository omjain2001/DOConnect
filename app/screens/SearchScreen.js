import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Text,
} from "@ui-kitten/components";
import { create } from "apisauce";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function SearchScreen(props) {
    const [Data, setData] = useState([]); 
  const [Hospitals, setHospitals] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    const api = create({
      baseURL: "http://www.communitybenefitinsight.org/api",
    });

    async function fetchData() {
      const result = await api.get("/get_hospitals.php?state=NC");
      if (!result.ok) {
        console.log(result.problem);
      } else {
        setHospitals(result.data);
        setData(result.data);
      }
    }
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const SearchIcon = (props) => {
    return <Icon {...props} name="search" />;
  };

  const renderItemAccessory = (props) => <Button size="tiny">VISIT</Button>;

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name} ${index + 1}`}
      description={`${item.street_address} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout style={styles.container} {...props}>
        <Layout style={{flex:1,zIndex:99}}>
        <Input
          accessoryLeft={SearchIcon}
          placeholder={"Search Hospitals"}
          value={Search}
          onChangeText={(value) => {
            if (value !== "") {
              setSearch(value);
              setHospitals(
                Hospitals.filter((d) => d.name.search(value) !== -1)
              );
            }else{
                setSearch(value);
                setHospitals(Data);
            }
          }}
        ></Input>
        </Layout>
        <Layout style={{flex:10}}>
          <List data={Hospitals} renderItem={renderItem} />
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

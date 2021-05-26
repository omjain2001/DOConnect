import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Image, Linking, ActivityIndicator } from "react-native";
import { create } from "apisauce";
import { Text, Spinner } from "@ui-kitten/components";
import Carousel from "react-native-snap-carousel";

function NewsCarousel() {
  const [Articles, setArticles] = useState([
    {
      urlToImage:"https://picsum.photos/id/237/200/300",
      url:"",
      title:"OOPs bad network",
    }
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const api = create({ baseURL: "https://newsapi.org/v2" });

    async function fetchData() {
      const result = await api.get(
        "/top-headlines?country=in&category=health&apiKey=c2c429428b644c709d33bc31f02cbb7f"
      );
      if (!result.ok) {
        console.log(result.problem);
      } else {
        setArticles(result.data.articles.slice(5,10)) ;
        console.log(Articles);
      }
    }
    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);

  const ref = useRef(null);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          backgroundColor:"#f2f2f2",
          overflow: "hidden",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: 250,
        }}
      >
        <Image
          style={{ width: 300, flex: 4, flexDirection: "column" }}
          onPress={() => {
            Linking.openURL(item.url);
          }}
          source={{ uri: item.urlToImage }}
        ></Image>
        <Text numberOfLines={2} style={{ fontSize: 15 ,flex:1, padding:5 }}>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <>
      <Carousel
        layout={"default"}
        autoplay={true}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        autoplayDelay={1000}
        autoplayInterval={3000}
        ref={ref}
        data={Articles}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderItem}
        loop={true}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </>
  );
}

export default NewsCarousel;

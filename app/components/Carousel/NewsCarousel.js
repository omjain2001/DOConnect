import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Image, Linking } from "react-native";
import { create } from "apisauce";
import { Text } from "@ui-kitten/components";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";

function NewsCarousel() {
  const [Articles, setArticles] = useState([
    {
      urlToImage: "https://picsum.photos/id/237/200/300",
      url: "",
      title: "OOPs bad network",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);

  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    const api = create({ baseURL: "https://newsapi.org/v2" });

    async function fetchData() {
      const result = await api.get(
        "/top-headlines?country=in&category=health&apiKey=c2c429428b644c709d33bc31f02cbb7f"
      );
      if (!result.ok) {
        console.log(result.problem);
      } else {
        setArticles(
          result.data.articles.slice(
            Math.floor(Math.random() * result.data.articles.length)
          )
        );
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
          flex: 1,
          backgroundColor: "#f2f2f2",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: 300,
        }}
      >
        <Image
          style={{ width: "100%", flex: 4, flexDirection: "column" }}
          onPress={() => {
            Linking.openURL(item.url);
          }}
          source={{ uri: item.urlToImage }}
        ></Image>
        <Text numberOfLines={2} style={{ fontSize: 15, flex: 1, padding: 5 }}>
          {item.title}
        </Text>
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
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        renderItem={renderItem}
        loop={true}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </>
  );
}

export default NewsCarousel;

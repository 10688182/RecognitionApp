import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View, Text, FlatList, Image, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios"

const dimensions = Dimensions.get("window")

const PredictionCard = ({ item }) => {
  return (
    <View style={{ flexDirection: "row", borderBottomWidth: 0.5 }}>
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
          padding: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "coral",
            width: 80,
            height: 80,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: 40,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{item.probability}%</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1.5,
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <Text>{item.className}</Text>
        <Text>{item.probability}% accuracy</Text>
      </View>
    </View>
  );
};

const PredictionsEmpty = () => {
  return (
    <View style={[styles.container, {justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: "green"}]}>
      <Text>Nothing To See Here</Text>
    </View>
  )
}

export default function Predict({ navigation, route }) {
  const { image } = route.params;
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState([])

  const classifyImage = () => {
    const data = new FormData();
  
    data.append("image", {
      name: "classify",
      type: "image/*",
      uri:
        Platform.OS === "android" ? image : image.replace("file://", "")
    });
    console.log(data)

    axios.post("http://192.168.100.5:3000/classify", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "accept": "*/*"
      },
      onUploadProgress: progressEvent => console.log(progressEvent)
    })
    .then(({data}) => {
      setPredictions(data)
      setLoading(false);
    })
    .catch(error => {
      setLoading(false);
    })
  }

  useEffect(() => {
    classifyImage()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageHolder}>
        <Image
          source={{uri: image}}
          style={styles.image}
        />
      </View>
      <View style={styles.list}>
        <FlatList
          data={predictions}
          keyExtractor={(item, index) => `${index}`}
          renderItem={PredictionCard}
          ListEmptyComponent={PredictionsEmpty}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    height: dimensions.width / 3 * 4
  },
  btn: {
    flex: 0.5,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 5,
    height: "50%",
    borderRadius: 10,
  },
  list: {
    flex: 1.5,
  },
});

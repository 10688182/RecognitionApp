import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View, Text, FlatList, Image, Dimensions, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios"
import * as Speech from 'expo-speech';
import useStorage from "../hooks/useStorage";

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
          <Text style={{ fontWeight: "bold" }}>{item.probability.toFixed(5)}%</Text>
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
        <Text>{item.probability.toFixed(5)}% accuracy</Text>
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
  const { addPrediction } = useStorage()
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
      setPredictions(data);
      setLoading(false);
      addPrediction({
        image,
        predictions: data
      })
    })
    .catch(error => {
      setLoading(false);
    })
  }

  useEffect(() => {
    classifyImage()
  }, [])
  
  useEffect(() => {
    if(predictions) {
      predictions.map(({className}, index) => {
        if(index === 0) {
          Speech.speak("This could be a " + className)
        }
        else {
          Speech.speak("or a " + className)
        }
      })
    }
  }, [predictions])

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={[styles.closeButton]}
          // onPress={() => navigation.goBack()}
        >
          <Text style={styles.sideButtonText}>Close</Text>
        </TouchableOpacity>
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
  list: {
    flex: 1,
    marginTop: -25,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#40999c55",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40999c",
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import useStorage from "../hooks/useStorage";
import { SafeAreaView } from 'react-native-safe-area-context';

const PredictionCard = ({item}) => {
  return (
    <View>
      {item.predictions.map((prediction, index) => (
        <View key={index}>
          <Text>{prediction.className}</Text>
          <Text>{prediction.probability}</Text>
        </View>
      ))}
    </View>
  )
}

const PredictionsEmpty = () => {
  return (
    <View style={[styles.container, {justifyContent: "center", alignItems: "center", height: "100%", backgroundColor: "green"}]}>
      <Text>Nothing To See Here</Text>
    </View>
  )
}


export default function Home({ navigation }) {
  const { getPredictions } = useStorage();
  const [predictions, setPredictions] = useState([{
    image: "hello",
    predictions: [{
      "className": "maraca",
      "probability": 0.04868842661380768
    },
    {
      "className": "remote control, remote",
      "probability": 0.030724789947271347
    },
    {
      "className": "seat belt, seatbelt",
      "probability": 0.030443459749221802
    }]
  }]);


  useEffect(() => {
    (async () => {
      const _predictions = await getPredictions()
      console.log(_predictions)
      setPredictions(_predictions)
    })()
  }, [])

  const navigateCamera = () => {
    navigation.navigate("Camera")
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={[styles.container, {backgroundColor: "red"}]}
        contentContainerStyle={[styles.container, {backgroundColor: "red"}]}
        data={predictions}
        keyExtractor={(item, index) => `${index}`}
        renderItem={PredictionCard}
        ListEmptyComponent={PredictionsEmpty}
      />
      {predictions.length > 0 &&
        <View style={styles.newContainer}>
          <TouchableOpacity
            style={[styles.newButton]}
            onPress={navigateCamera}
          >
            <Text>New</Text>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  newContainer: {
    position: "absolute",
    bottom: 0,
    height: 200,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  newButton: {
    height: 90,
    width: 90,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  }
});

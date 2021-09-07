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
    <View style={{flexDirection: "row", margin: 15}}>
      <Image
        source={{uri: item.image}}
        style={{height: 140, width: 105, borderRadius: 5}}
      />
      <View style={{padding: 10, flex: 1, justifyContent: "space-evenly"}}>
        {item.predictions.map((prediction, index) => (
          <View key={index} style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{fontSize: 16}}>{prediction.className.split(",")[0]}</Text>
            <Text style={{fontSize: 16}}>{prediction.probability.toFixed(5)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const PredictionsEmpty = () => {
  return (
    <View style={[styles.container, {justifyContent: "center", alignItems: "center", height: "100%"}]}>
      <Text>Nothing To See Here</Text>
    </View>
  )
}


export default function Home({ navigation }) {
  const { getPredictions } = useStorage();
  const [predictions, setPredictions] = useState([]);


  useEffect(() => {
    (async () => {
      const _predictions = await getPredictions()
      console.log(_predictions)
      setPredictions(_predictions)
    })()
  })

  const navigateCamera = () => {
    navigation.navigate("Camera")
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={[styles.container]}
        contentContainerStyle={[predictions.length < 1 && styles.container]}
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
            <Text style={styles.newButtonText}>New</Text>
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
    borderWidth: 7.5,
    borderColor: "#40999c55",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#40999c",
  },
  newButtonText: {
    color: "white"
  },
});

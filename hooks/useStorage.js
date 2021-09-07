import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useStorage() {

  const getPredictions = async() => {
    const predictions = await AsyncStorage.getItem('@predictions')
    return JSON.parse(predictions)??[];
  }

  const addPrediction = async(prediction) => {
    const predictions = await AsyncStorage.getItem('@predictions');
    await AsyncStorage.setItem('@predictions', JSON.stringify([...(JSON.parse(predictions)??[]), prediction]))
  }

  return ({
    getPredictions,
    addPrediction
  })
}
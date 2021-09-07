import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/Home";
import CameraScreen from "./screens/Camera";
import PredictScreen from "./screens/Predict";

export default function App({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: "screen",
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Predict" component={PredictScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

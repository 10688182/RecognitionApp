import { StatusBar } from "expo-status-bar";
import React from "react";
import Home from "./Home";
import Cam from "./Camera";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Predict from "./Predict";

export default function App({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Camera" component={Cam} />
        <Stack.Screen name="Predict" component={Predict} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

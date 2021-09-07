import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

const Result_view = ({ value, item }) => {
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
          <Text style={{ fontWeight: "bold" }}>{value}%</Text>
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
        <Text>{item}</Text>
        <Text>{value}% accuracy</Text>
      </View>
    </View>
  );
};

const Data = [
  { id: "1", item: "Dress", accu: 30 },
  { id: "2", item: "Dress", accu: 30 },
  { id: "3", item: "Dress", accu: 30 },
  { id: "4", item: "Dress", accu: 30 },
  { id: "5", item: "Dress", accu: 30 },
];

export default function Predict({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageHolder}>
        <View
          style={{
            backgroundColor: "black",
            padding: 8,
            justifyContent: "center",
            position: "absolute",
            bottom: 1,
            width: "100%",
          }}
        >
          <Text style={{ color: "white" }}>Dress</Text>
        </View>
      </View>
      <View style={styles.list}>
        <FlatList
          data={Data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Result_view item={item.item} value={item.accu} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageHolder: {
    flex: 1,
    backgroundColor: "#40999c",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
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

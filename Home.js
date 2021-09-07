import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ImagePickerIOS,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

export default function Home({ navigation }) {
  // function ImagePicker() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // }

  // function Camera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  // }
  return (
    <View style={styles.container}>
      <View style={styles.imageHolder}>
        {/* <View style={styles.img}></View> */}
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontFamily: "serif",
          }}
        >
          iRec
        </Text>
        <Text
          style={{
            color: "white",
            alignItems: "center",
            flexWrap: "wrap-reverse",
            justifyContent: "center",
          }}
        >
          Identify the content of images by taking a photo from camera or
          gallery.
        </Text>
      </View>
      <View style={styles.btn}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <Icon name="camera-outline" type="ionicon" size={100} />
          <Text style={{ fontWeight: "bold" }}>Take a picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={pickImage}>
          <Icon name="image-outline" type="ionicon" size={100} />
          <Text style={{ fontWeight: "bold" }}>Upload an image</Text>
        </TouchableOpacity>
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
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
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
  img: {
    height: 350,
    width: 350,
    backgroundColor: "#c9c9c9",
  },
});

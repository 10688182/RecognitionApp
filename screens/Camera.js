import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from "react-native-elements/dist/icons/Icon";

const dimensions = Dimensions.get("window")

export default function CameraScreen({ navigation }) {
  const cameraRef = useRef();

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      
      if (data.uri) {
        setIsPreview(true);
        setImage(data.uri);
        console.log("picture source", data.uri);
      }
    }
  };

  const selectPicture = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!data.cancelled) {
      setIsPreview(true);
      setImage(data.uri);
      console.log("picture source", data.uri);
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const cancelPreview = async () => {
    setIsPreview(false);
  };

  const navigatePrediction = async() => {
    const fileName = FileSystem.documentDirectory + `irec/${new Date().getTime()}.${image.split(".").slice(-1)[0]}`
    await FileSystem.copyAsync({
      from: image,
      to: fileName
    })
    navigation.navigate("Predict", {image: fileName})
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <View style={[{alignItems: "flex-end", justifyContent: "center", flex: 1}]}>
          {!isPreview &&
            <TouchableOpacity
              style={[styles.sideButton]}
              onPress={() => setFlash(!flash)}
            >
              <Text>Retake</Text>
            </TouchableOpacity>
          }
        </View>
        {isPreview ?
          <Image
            source={{uri: image}}
            style={styles.camera}
          />
          :
          <Camera
            ref={cameraRef}
            type={cameraType}
            style={styles.camera}
            flashMode={Camera.Constants.FlashMode[flash ? "on" : "off"]}
            onCameraReady={onCameraReady}
            onMountError={(error) => {
              console.log("camera error", error);
            }}
          />
        }
      </View>
      {isPreview ?
        <View style={styles.newContainer}>
          <TouchableOpacity
            style={[styles.newButton]}
            onPress={cancelPreview}
          >
            <Text>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.newButton]}
            onPress={navigatePrediction}
          >
            <Text>Use Image</Text>
          </TouchableOpacity>
        </View>
        : 
        <View style={styles.newContainer}>
          <TouchableOpacity
            style={[styles.sideButton]}
            onPress={selectPicture}
            disabled={!isCameraReady}
          >
            <Text>Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.newButton]}
            onPress={takePicture}
            disabled={!isCameraReady}
          >
            <Text>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sideButton]}
            onPress={switchCamera}
            disabled={!isCameraReady}
          >
            <Text>Switch</Text>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  camera: {
    height: dimensions.width / 3 * 4
  },
  newContainer: {
    // position: "absolute",
    bottom: 0,
    height: 200,
    left: 0,
    right: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row"
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
  },
  sideButton: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  }
});

//Viktor
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Button, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";

/*Vælg billeder fra telefonen*/
const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        
    });

    if (!result.canceled) {
        setImagesArr((imagesArr) => [result].concat(imagesArr));
    }

};

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [ setImageTaken] = useState(false); // New state variable
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }

      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.gallery}>
        <Text>Please give access to the Camera in the settings</Text>
        <Button title={"Change settings"} onPress={() => Linking.openSettings()} />
      </View>
    );
  }

  // Function to handle taking a picture and navigating to "Details" screen
  const takePictureAndNavigate = async () => {
    navigation.navigate("All Options"); // Navigate to "Details" screen
  };

  return (
    <Fragment>
      <StatusBar StatusBarStyle="dark-content" style={{ fontcolor: "white" }} backgroundColor={"rgba(255,255,255,0.4)"} />
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={{ flexDirection: "column", alignContent: "center", flex: 1, padding: 20 }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                }}
              >
                <Text style={styles.text}>Flip camera</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={takePictureAndNavigate}>
                <Text style={styles.text}>{"Take a photo"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.text}>Photos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 5,
  },
  buttonGallery: {
    fontSize: 15,
    color: "white",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    padding: 5,
    alignSelf: "flex-end",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  gallery: {
    flex: 0.4,
    paddingTop: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CameraScreen;



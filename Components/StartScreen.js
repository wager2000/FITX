import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";

const buttons = [
  {
    id: 1,
    placeName: "Crossjump",
    imageSource: require("../assets/Cross.jpeg"),
  },
  {
    id: 2,
    placeName: "Yoga",
    imageSource: require("../assets/Yoga.jpeg"),
  },
  {
    id: 3,
    placeName: "Running",
    imageSource: require("../assets/Yoga.jpeg"),
  },
  {
    id: 4,
    placeName: "Tennis",
    imageSource: require("../assets/Yoga.jpeg"),
  },
  {
    id: 5,
    placeName: "Crossfit",
    imageSource: require("../assets/Yoga.jpeg"),
  },
  {
    id: 6,
    placeName: "Made by Mila",
    imageSource: require("../assets/Yoga.jpeg"),
  },
  {
    id: 7,
    placeName: "SuperFit",
    imageSource: require("../assets/Cross.jpeg"),
  },
  {
    id: 8,
    placeName: "Yogatime",
    imageSource: require("../assets/Cross.jpeg"),
  },
  {
    id: 9,
    placeName: "Button 9",
    imageSource: require("../assets/Cross.jpeg"),
  },
  {
    id: 10,
    placeName: "Button 10",
    imageSource: require("../assets/Cross.jpeg"),
  },
];

const Startscreen = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        console.log("User location:", location.coords);
        setUserLocation(location.coords);
      } catch (error) {
        console.error("Error getting location: ", error);
      }
    };

    const timer = setTimeout(() => {
      getLocation();
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleButtonPress = (button) => {
    navigation.navigate("EventScreen", { placeName: button.placeName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Her er aktiviteterne</Text>
      </View>
      <ScrollView horizontal>
        {buttons.slice(0, 5).map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button, styles.topButton]}
            onPress={() => handleButtonPress(button)}
          >
            <View style={styles.buttonBackground}>
              <Image source={button.imageSource} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{button.placeName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal>
        {buttons.slice(5, 10).map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button, styles.secondButton]}
            onPress={() => handleButtonPress(button)}
          >
            <View style={styles.buttonBackground}>
              <Image source={button.imageSource} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{button.placeName}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0782F9",
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 5,
    minWidth: 30,
    height: 170,
    width: 300,
    overflow: "hidden",
  },
  buttonText: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "white",
    fontWeight: "400",
    fontSize: 30,
  },
  topButton: {
    marginTop: 5,
  },
  secondButton: {
    marginBottom: 20,
  },
  buttonBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default Startscreen;
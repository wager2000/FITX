import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Define an array of button properties
const buttons = [
  {
    id: 1,
    text: "Button 1",
    imageSource: require("../assets/Cross.jpeg"), // Change to the desired image source
  },
  {
    id: 2,
    text: "Button 2",
    imageSource: require("../assets/Yoga.jpeg"), // Change to the desired image source
  },
  {
    id: 3,
    text: "Button 3",
    imageSource: require("../assets/Yoga.jpeg"), // Change to the desired image source
  },
  {
    id: 4,
    text: "Button 4",
    imageSource: require("../assets/Yoga.jpeg"), // Change to the desired image source
  },
  {
    id: 5,
    text: "Button 5",
    imageSource: require("../assets/Yoga.jpeg"), // Change to the desired image source
  },
  {
    id: 6,
    text: "Button 6",
    imageSource: require("../assets/Yoga.jpeg"), // Change to the desired image source
  },
  {
    id: 7,
    text: "Button 7",
    imageSource: require("../assets/Cross.jpeg"), // Change to the desired image source
  },
  {
    id: 8,
    text: "Button 8",
    imageSource: require("../assets/Cross.jpeg"), // Change to the desired image source
  },
  {
    id: 9,
    text: "Button 9",
    imageSource: require("../assets/Cross.jpeg"), // Change to the desired image source
  },
  {
    id: 10,
    text: "Button 10",
    imageSource: require("../assets/Cross.jpeg"), // Change to the desired image source
  },
];

const Startscreen = () => {
  const navigation = useNavigation();

  const handleButtonPress = (button) => {
    if (button.text === "Settings") {
      navigation.navigate("Settings");
    } else {
      // Handle other button presses
    }
  };
  const handleButtonPressToSearch = (button) => {
    if (button.text === "Search") {
      navigation.navigate("Search");
    } else {
      // Handle other button presses
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
      <Text style={styles.text}>Her er aktiveterne</Text>

        {buttons.slice(0, 5).map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button, styles.topButton]}
            onPress={() => handleButtonPress(button)}
          >
            <View style={styles.buttonBackground}>
              <Image source={button.imageSource} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{button.text}</Text>
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
              <Text style={styles.buttonText}>{button.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView horizontal>
        {buttons.slice(5, 10).map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button, styles.thirdButton]}
            onPress={() => handleButtonPress(button)}
          >
            <View style={styles.buttonBackground}>
              <Image source={button.imageSource} style={styles.buttonImage} />
              <Text style={styles.buttonText}>{button.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton}>
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/home.png")}
              style={styles.buttonIcon}
            />
            <Text style={styles.bottomBarButtonText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => navigation.navigate("Search")}
        >
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/search.png")}
              style={styles.buttonIcon}
            />
            <Text style={styles.bottomBarButtonText}>Search</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton}>
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/love.png")}
              style={styles.buttonIcon}
            />
            <Text style={styles.bottomBarButtonText}>Favorite</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarButton}>
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/file.png")}
              style={styles.buttonIcon}
            />
            <Text style={styles.bottomBarButtonText}>History</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarButton5}
          onPress={() => navigation.navigate("Settings")}
        >
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/settings.png")}
              style={styles.buttonIcon}
            />
            <Text style={styles.bottomBarButtonText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
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
  thirdButton: {
    marginBottom: 10,
  },
  bottomBarButton: {},
  bottomBar: {
    flexDirection: "row",
    backgroundColor: "#0782F9",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  bottom: {
    flexDirection: "row",
    backgroundColor: "#0782F9",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    width: "100%",
  },
  bottomBarButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    marginHorizontal: 1,
  },
  buttonIconContainer: {
    alignItems: "center",
    marginHorizontal: 1,
  },
  buttonIcon: {
    width: 30, // Adjust the icon size as needed
    height: 30, // Adjust the icon size as needed
    marginBottom: 5, // Adjust the margin between icon and text
  },
  buttonBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bottomBarButton5: {},
});

export default Startscreen;

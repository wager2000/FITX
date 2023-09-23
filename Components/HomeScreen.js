import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";


const HomeScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Login"); // Navigate to the Login screen
  };

  const handleSignUpPress = () => {
    navigation.navigate("Registration"); // Navigate to the Registration screen
  };

  return (
    <ImageBackground
      source={require("../assets/hygge.jpeg")} // Replace with your background image
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to SocialEx</Text>
        <Text style={styles.subtitle}>
          Discover and enjoy exciting activities together.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLoginPress} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUpPress} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signupMessage}>
          Don't have an account? Sign up to get started!
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row", // Arrange buttons horizontally
    justifyContent: "space-between", // Add space between buttons
    width: "80%",
  },
  button: {
    backgroundColor: "#0782F9",
    flex: 1, // Take equal space
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0554F2",
    marginRight: 10, // Add margin to separate buttons
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  signupMessage: {
    color: "white",
    marginTop: 10,
  },
});

export default HomeScreen;

// Importerer de nødvendige biblioteker og moduler
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"; // Importerer Firebase moduler 
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

// Definerer komponenten til login-skærmen
const LoginScreen = () => {
  // States til opbevaring af brugerens indtastede oplysninger
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// Bruger navigation til at håndtere skærmnavigation
  const navigation = useNavigation();

  // Funktion til at håndtere brugerens login
  const handleLogin = () => {
    // Login ved hjælp af Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.replace("Start"); // Navigarer til startskærmen efter accepteret login
      })
      .catch((error) => alert(error.message));
  };

  // Render Loginskærmen
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/*Baggrundbillede på loginskærmen*/}
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../assets/basket.jpeg")} // Replace with your background image file
          style={styles.backgroundImage}
        />
      </View>
      <Text style={styles.headerText}>Login</Text>
      <View style={styles.formContainer}>
        {/*Inputfelter*/}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        {/*Knappen til login*/}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// Forskellige styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  backgroundImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

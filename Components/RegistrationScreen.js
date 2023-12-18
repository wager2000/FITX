// Importering af nødvendige moduler og komponenter
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

// Deklaration af Registreringsskærmen
const RegistrationScreen = () => {
  // States til email og password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigation hook fra react-navigation
  const navigation = useNavigation();

  // Funktion til at generere en UID
  const generateUID = () => {
    // Generer en tilfældig UID
    return (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
  };

  // Funktion til at håndtere brugerregistrering
  const handleSignUp = async () => {
    try {
      // Opret brugeren
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generer en UID
      const uid = generateUID();

      // Tilføj brugerdata til Firestore med den genererede UID som dokument-ID
      const userRef = doc(db, "users", uid);
      const userData = {
        Email: email,
        Password: password,
        // Tilføj andre brugerdata efter behov
      };

      await setDoc(userRef, userData);

      console.log("Registered with:", user.email);
      console.log("Password is", user.password)
      console.log("UID:", uid);

      // Du kan navigere til login-skærmen eller en anden skærm efter registrering.
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error creating user: ", error);
      alert(error.message);
    }
  };

  // Funktion til at håndtere tryk på login-linket
  const handleLoginLinkPress = () => {
    navigation.navigate("LoginScreen");
  };

  // Render Registreringsskærmen
  return (
    <ImageBackground
      source={require("../assets/livet.jpeg")}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior="padding"
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.headerText}>Welcome to User Registration</Text>
        <View style={styles.formContainer}>
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
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.loginText}>
            If you already have a user, click{" "}
            <Text
              style={styles.loginLinkText}
              onPress={handleLoginLinkPress}
            >
              here
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Forskellige stilarter
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Tilføj en semi-transparent sort overlay
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Tilføj en semi-transparent hvid baggrund
    borderRadius: 10,
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "white",
  },
  loginLinkText: {
    color: "#0782F9",
    textDecorationLine: "underline",
  },
});

export default RegistrationScreen;

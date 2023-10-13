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
import { doc, setDoc } from "firebase/firestore"; // Update the import statements
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const generateUID = () => {
    // Generate a random UID
    return (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Generate a UID
      const uid = generateUID();

      // Add user data to Firestore with the generated UID as the document ID
      const userRef = doc(db, "users", uid);
      const userData = {
        Email: email,
        Password: password,
        // Add other user data as needed
      };

      await setDoc(userRef, userData);

      console.log("Registered with:", user.email);
      console.log("Password is", user.password)
      console.log("UID:", uid);

      // You can navigate to the login screen or any other screen after registration.
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error creating user: ", error);
      alert(error.message);
    }
  };

  const handleLoginLinkPress = () => {
    navigation.navigate("LoginScreen");
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Add a semi-transparent black overlay
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
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent white background
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
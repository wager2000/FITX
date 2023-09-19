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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      // Add user data to Firestore
      const userRef = collection(db, "users");
      const userData = {
        Email: email,
        Password: password
        // Add other user data as needed
      };

      const docRef = await addDoc(userRef, userData);
      console.log("Document written with ID: ", docRef.id);

      // Proceed with user registration
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
          console.log("Password with:", user.password);
          // You can navigate to the home screen or any other screen after registration.
          navigation.replace("Home");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleLoginLinkPress = () => {
    navigation.navigate("Login"); // Replace "Login" with the name of your login screen
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../assets/pexels-photo-4662357.jpeg")} // Replace with your image file
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.formContainer}>
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
          <Text>
            If you already have a user, click{" "}
            <Text style={styles.loginLinkText} onPress={handleLoginLinkPress}>
              here
            </Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent white background
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
  loginLinkText: {
    color: "#0782F9",
    textDecorationLine: "underline",
  },
});

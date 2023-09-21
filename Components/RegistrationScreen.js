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
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { CheckBox } from "react-native-elements";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      // Add user data to Firestore
      const userRef = collection(db, "users");
      const userData = {
        Email: email,
        Password: password,
        Interest: interests,
      };

      const docRef = await addDoc(userRef, userData);
      console.log("Document written with ID: ", docRef.id);

      // Proceed with user registration
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
          console.log("Password with:", user.password);
          console.log("Interests:", user.interests);
          // You can navigate to the home screen or any other screen after registration.
          navigation.replace("Home");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleLoginLinkPress = () => {
    navigation.navigate("Login");
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Text style={styles.label}>Interests:</Text>
            {interestOptions.map((option) => (
              <CheckBox
                key={option}
                title={option}
                checked={interests.includes(option)}
                onPress={() =>
                  setInterests((prevInterests) =>
                    prevInterests.includes(option)
                      ? prevInterests.filter((interest) => interest !== option)
                      : [...prevInterests, option]
                  )
                }
                containerStyle={styles.checkBoxContainer}
                textStyle={styles.checkBoxText}
              />
            ))}
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
              If you already have a user, click{" "}
              <Text style={styles.loginLinkText} onPress={handleLoginLinkPress}>
                here
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const interestOptions = ["Soccer", "Yoga", "Pilates", "Other"];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 0,
    marginTop: 5,
  },
  checkBoxText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
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

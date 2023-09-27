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
  SafeAreaView, // Import SafeAreaView
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Update the import statements
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";

// Definerer en komponent til registreringskærmen
const RegistrationScreen = () => {
  // States skal bruges til at opbevare brugerdata
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [interests, setInterests] = useState([]);
  const [level, setLevel] = useState([]);

  //Bruger navigation til at styre de forskellige skærme
  const navigation = useNavigation();

  // Funktion til at håndtere registreringen af en ny bruger
  const handleSignUp = async () => {
    try {
      // Tilføjer en bruger til Firestore
      const userRef = collection(db, "users");
      const userData = {
        Email: email,
        Password: password,
        Interest: interests,
        Level: level,
      };

      await setDoc(userRef, userData);

      // Fortsætter med at lave en brugerregistrering med Firebase Authentication
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
          console.log("Password with:", user.password);
          console.log("Interests:", user.interests);
          console.log("Level is:", user.level);
          // Man blive navigeret til login-skærmen efter registrering
          navigation.replace("Login");
        })
        .catch((error) => alert(error.message));
    } catch (error) {
      console.error("Error creating user: ", error);
      alert(error.message);
    }
  };
  // Funktion til at håndtere tryk på "Log ind" linket
  const handleLoginLinkPress = () => {
    navigation.navigate("Login");
  };

  // Render registreringsskærmen
  return (
    <ImageBackground
      source={require("../assets/livet.jpeg")}
      style={styles.container}
    >
      <SafeAreaView style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.headerText}>User Registration</Text>
          <View style={styles.formContainer}>
            {/*Input felter*/}
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
            {/*Interesse felt*/}
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
            {/*Registreringsknap og log ind-link*/}
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
      </SafeAreaView>
    </ImageBackground>
  );
};

// Definerer interesse- og niveauindstillinger
const interestOptions = ["Soccer", "Yoga", "Pilates", "Crossfit", "Other"];

// Definerer de forskellige styles på de implementerede ting på skærmen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
    alignSelf: "center", // Center the form horizontally
    marginTop: 20, // Add some top margin for spacing
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

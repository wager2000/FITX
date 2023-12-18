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
  Image,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { doc, getDoc } from "firebase/firestore"; 
import { db, auth } from "../firebaseConfig";

// Deklaration af Loginskærmen
const LoginScreen = () => {
  // States til email, password og brugernavn
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(""); // State variable to store the user's name

  // Navigation hook fra react-navigation
  const navigation = useNavigation();

  // Funktion til at håndtere login
  const handleLogin = async () => {
    try {
      // Log ind på brugeren
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Hent brugerens navn fra Firestore ved hjælp af UID
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        // Hent brugerens navn fra dokumentdata
        const userData = userSnapshot.data();
        setUserName(userData.Name); // Sæt brugerens navn i staten
      } else {
        console.log("User data not found");
      }

      // Naviger til Startskærmen
      navigation.replace("Start", { userName });
    } catch (error) {
      console.error("Error logging in: ", error);
      alert(error.message);
    }
  };

  // Render Loginskærmen
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {/* Baggrundsbillede på loginskærmen */}
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../assets/basket.jpeg")} // Erstat med din egen billedfil
          style={styles.backgroundImage}
        />
      </View>
      <Text style={styles.headerText}>Login</Text>
      <View style={styles.formContainer}>
        {/* Inputfelter */}
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
        {/* Knappen til login */}
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

// Forskellige stilarter
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

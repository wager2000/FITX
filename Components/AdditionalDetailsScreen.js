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
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AdditionalDetailsScreen = ({ route }) => {
  const [interests, setInterests] = useState("");
  const navigation = useNavigation();

  const { userId } = route.params; // Get the user ID passed from RegistrationScreen

  const handleSaveDetails = async () => {
    try {
      // Update user's interests in Firestore
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        Interests: interests.split(",").map((interest) => interest.trim()), // Store interests as an array
        // Add other additional details as needed
      });

      // After saving details, navigate to the HomeScreen or any other screen
      navigation.replace("Home");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.headerText}>Additional Details</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Interests (comma-separated)"
          value={interests}
          onChangeText={(text) => setInterests(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSaveDetails} style={styles.button}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
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
});

export default AdditionalDetailsScreen;
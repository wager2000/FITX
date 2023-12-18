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
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Deklaration af komponenten AdditionalDetailsScreen
const AdditionalDetailsScreen = ({ route }) => {
  // Lokal state for brugerens interesser
  const [interests, setInterests] = useState("");
  // Navigation hook fra react-navigation
  const navigation = useNavigation();

  // Funktion til at gemme brugerens detaljer i Firestore
  const handleSaveDetails = async () => {
    try {
      // Referencen til brugerens dokument i Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      // Opdaterer dokumentet med brugerens interesser
      await updateDoc(userDocRef, {
        Interests: interests.split(",").map((interest) => interest.trim()),
      });
      // Navigerer tilbage til hjemmeskærmen efter opdatering
      navigation.replace("Home");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Rendering af komponenten
  return (
    // Container med tastaturundgåelsesvisning
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      contentContainerStyle={styles.contentContainer}
    >
      {/* Overskriftstekst for skærmen */}
      <Text style={styles.headerText}>Additional Details</Text>
      {/* Container til formularen */}
      <View style={styles.formContainer}>
        {/* Tekstinput til brugerens interesser */}
        <TextInput
          placeholder="Interests (comma-separated)"
          value={interests}
          onChangeText={(text) => setInterests(text)}
          style={styles.input}
        />
        {/* Gem knap */}
        <TouchableOpacity onPress={handleSaveDetails} style={styles.button}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
        {/* Spring over knap (ikke implementeret i funktionen) */}
        <TouchableOpacity onPress={handleSaveDetails} style={styles.button}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Stildefinitioner for komponenten
const styles = StyleSheet.create({
  // Generel containerstil
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  // Stil for indhold i containeren
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  // Stil for overskriftstekst
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  // Stil for formularen
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
  },
  // Stil for tekstinputfelt
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  // Stil for knapper
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  // Stil for tekst på knapper
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

// Eksportering af komponenten som standard
export default AdditionalDetailsScreen;

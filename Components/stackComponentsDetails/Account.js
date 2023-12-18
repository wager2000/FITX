import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../firebaseConfig"; // Import Firebase auth and Firestore objects
import { updateProfile } from "firebase/auth"; // Import the updateProfile function
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import Firestore functions

const Account = () => {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userDocumentRef, setUserDocumentRef] = useState(null); // Gem brugerens Firestore dokumentreference

  useEffect(() => {
    // Tjek om en bruger er godkendt
    const user = auth.currentUser;
    if (user) {
      setUserDocumentRef(doc(db, "users", user.uid)); // Sæt Firestore dokumentreference
      fetchUserData(user.uid); // Hent brugerdata når komponenten monteres
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setEmail(userData.Email); // Sæt email fra Firestore
      }
    } catch (error) {
      console.error("Fejl ved hentning af brugerdata: ", error);
    }
  };

  const handleSave = async () => {
    try {
      // Opdater email i Firebase Authentication
      const user = auth.currentUser;
      await updateProfile(user, { email: newEmail });

      // Opdater email i Firestore
      await updateDoc(userDocumentRef, {
        Email: newEmail,
      });

      // Opdater email i UI'en
      setEmail(newEmail);
      setEditMode(false);
    } catch (error) {
      console.error("Fejl ved opdatering af email: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Email: {email}</Text>
      </View>
      {editMode ? (
        <View style={styles.settingItem}>
          <TextInput
            placeholder="Ny Email"
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
            style={styles.input}
          />
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        {editMode ? (
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Gem</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setEditMode(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Rediger</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 18,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  buttonContainer: {
    width: "60%",
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
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Account;
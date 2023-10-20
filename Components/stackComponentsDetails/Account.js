//Viktor
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

//Funktionen AccountScreen returnerer et View med valg brugerne kan ændre på.
//Disse valg er om brugeren vil ændre på deres email.
//Der er en knap, hvor at brugeren kan submitte sine ændringer.
const AccountScreen = () => {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userDocumentRef, setUserDocumentRef] = useState(null); // Store user's Firestore document reference

  //Tjekker om brugeren er logget ind, hvis brugeren er logget ind, så hentes brugerens email fra Firestore.
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserDocumentRef(doc(db, "users", user.uid)); 
      fetchUserData(user.uid); 
    }
  }, []);

  //Funktionen fetchUserData henter brugerens email fra Firestore.
  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setEmail(userData.Email); 
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  //Funktionen handleSave opdaterer brugerens email i Firebase Authentication og Firestore.
  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      await updateProfile(user, { email: newEmail });

      await updateDoc(userDocumentRef, {
        Email: newEmail,
      });

      setEmail(newEmail);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating email: ", error);
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
            placeholder="New Email"
            value={newEmail}
            onChangeText={(text) => setNewEmail(text)}
            style={styles.input}
          />
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        {editMode ? (
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setEditMode(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

//Styles til UI
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

export default AccountScreen;

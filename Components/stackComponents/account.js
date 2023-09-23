import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const AccountScreen = () => {
  const [email, setEmail] = useState("");
  const [userDocument, setUserDocument] = useState(null); // Store user data from Firestore
  const [editMode, setEditMode] = useState(false); // To toggle edit mode

  useEffect(() => {
    // Fetch user data from Firestore
    fetchUserData("USER_ID_HERE"); // Replace with the actual user ID
  }, []);

  const fetchUserData = async (userId) => {
    const userDocRef = doc(db, "users", userId); // Reference to the user's document in Firestore
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // User document exists in Firestore
      const userData = userDocSnapshot.data();
      setEmail(userData.Email);
      // You can set other user data fields as needed
      setUserDocument(userDocSnapshot.ref);
    }
  };

  const handleUpdate = async () => {
    try {
      // Update user data in Firestore
      await updateDoc(userDocument, {
        Email: email,
        // Update other user data fields as needed
      });

      setEditMode(false); // Disable edit mode after updating
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          editable={editMode} // Allow editing only in edit mode
        />
        {/* Add more input fields for other user data if needed */}
      </View>

      <View style={styles.buttonContainer}>
        {editMode ? (
          <TouchableOpacity onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditMode(true)} style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as React from "react";

// Function to navigate to a specific route
const navController = (navigation, route) => {
  navigation.navigate(route);
};

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <Text style={styles.headerText}>Hello, account name</Text>
      <Image
        source={require("./Pictures/blank.png")} 
        style={styles.cameraImage}
      />
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => navController(navigation, "Camera")}
      >
        <Text style={styles.settingLabel}>Change your profile picture</Text>
      </TouchableOpacity>
      <View style={styles.settingContainer}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navController(navigation, "Account")}
        >
          <Text style={styles.settingLabel}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navController(navigation, "Billing")}
        >
          <Text style={styles.settingLabel}>Billing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navController(navigation, "Settings")}
        >
          <Text style={styles.settingLabel}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navController(navigation, "PrivacySettings")}
        >
          <Text style={styles.settingLabel}>Privacy Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  settingLabel: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  cameraImage: {
    width: 70, // Adjust the size as needed
    height: 70, // Adjust the size as needed
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 50,
  },
});

export default DetailsScreen;

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as React from "react";

const navController = (navigation, route) => {
  navigation.navigate(route);
};

function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, account name</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navController(navigation, "Account")}
        >
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navController(navigation, "Billing")}
        >
          <Text style={styles.buttonText}>Billing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navController(navigation, "Settings")}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Background color
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Spacing below the header text
  },
  buttonContainer: {
    width: "80%", // Adjust the width as needed
  },
  button: {
    backgroundColor: "#f0f0f0", // Light gray background
    paddingVertical: 15, // Vertical padding
    borderRadius: 8, // Border radius
    marginBottom: 15, // Spacing between buttons
    width: "100%", // Button width
    alignItems: "center", // Center button content horizontally
  },
  buttonText: {
    color: "#333", // Dark gray text color
    fontSize: 18, // Button text font size
    fontWeight: "bold", // Button text font weight
  },
});

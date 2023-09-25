//Viktor
//Importerer de nødvendige funktioner fra react.
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as React from "react";
//Funktionen navController gør det muligt at navigerer i appen route.
const navController = (navigation, route) => {
  navigation.navigate(route);
};

//Funktionen DetailsScreen returnerer et View med Text og TouchableOpacity, således at brugeren kan navigere til de forskellige komponenter i stacken.
//Så hver TouchableOpacity har en knap, hvor at brugeren kan trykke på den og komme til den ønskede komponent
function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Hello, account name</Text>
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
      </View>
    </View>
  );
}

export default DetailsScreen;

//Styles til UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white", // Background color
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Spacing below the header text
  },
  settingContainer: {
    width: "80%", // Adjust the width as needed
    backgroundColor: "white", // Background color of the settings container
    padding: 16, // Padding for the settings container
    borderRadius: 8, // Border radius for the settings container
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Shadow for Android
  },
  settingItem: {
    backgroundColor: "#f0f0f0", // Light gray background
    paddingVertical: 15, // Vertical padding
    borderRadius: 8, // Border radius
    marginBottom: 15, // Spacing between settings items
    alignItems: "center", // Center setting item content horizontally
  },
  settingLabel: {
    color: "#333", // Dark gray text color
    fontSize: 18, // Setting item text font size
    fontWeight: "bold", // Setting item text font weight
  },
});

//Importerer de nødvendige funktioner fra react.
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as React from "react";
//Funktionen navController gør det muligt at navigerer i appen route.
const navController = (navigation, route) => {
  navigation.navigate(route);
};

//Funktionen DetailsScreen returnerer et View med Text og TouchableOpacity, således at brugeren kan navigere til de forskellige komponenter i stacken.
//Så hver TouchableOpacity har en knap, hvor at brugeren kan trykke på den og komme til den ønskede komponent
function History({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Check your Sessions</Text>
      <View style={styles.settingContainer}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navController(navigation, "KommendeArrangementer")}
        >
          <Text style={styles.settingLabel}>Incoming Sessions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navController(navigation, "AfsluttedeArrangementer")}
        >
          <Text style={styles.settingLabel}>Finished Sessions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default History;

//Styles til UI
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
});



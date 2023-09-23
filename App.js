import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Startscreen from "./Components/StartScreen";
import SearchScreen from "./Components/SearchScreen";
import SettingsScreen from "./Components/Settings";
import AdditionalDetailsScreen from "./Components/AdditionalDetailsScreen";
import LoginScreen from "./Components/LoginScreen";
import RegistrationScreen from "./Components/RegistrationScreen";

import { AppRegistry } from "react-native";
import HomeScreen from "./Components/HomeScreen";

// AppRegistry.registerComponent('YourAppName', () => FITX);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Startscreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
          options={{ headerShown: false }}
          name="Start"
          component={Startscreen}
        />

      <Stack.Screen name="Registration" component={RegistrationScreen}></Stack.Screen>


       
        <Stack.Screen
          options={{ headerShown: true }}
          name="Login"
          component={LoginScreen}
        />

              <Stack.Screen name="Home" component={AdditionalDetailsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
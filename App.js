import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Startscreen from "./Components/StartScreen";
import SearchScreen from "./Components/SearchScreen";
import SettingsScreen from "./Components/Settings";
import AdditionalDetailsScreen from "./Components/AdditionalDetailsScreen";
import LoginScreen from "./Components/LoginScreen";
import RegistrationScreen from "./Components/RegistrationScreen";
import HistoryScreen from "./Components/History";
import KommendeArrangementer from "./Components/kommendeArrangementer";
import AfsluttedeArrangementer from "./Components/afsluttedeArrangementer";
import StackNavigator from "./Components/StackNavigator";
import DetailsScreen from "./Components/DetailsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ tabBarVisible: false }}
          name="Start"
          component={Startscreen}
        />
        {/*<Tab.Screen name="Registration" component={RegistrationScreen} />*/}
        {/*<Tab.Screen
          name="Login"
          component={LoginScreen}
        />*/}
        {/* <Tab.Screen name="Home" component={AdditionalDetailsScreen} />*/}

        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Details" component={StackNavigator} />
        {/*<Tab.Screen
          name="Afsluttede Arrangementer"
          component={AfsluttedeArrangementer}
        />*/}
        {/*<Tab.Screen
          name="Kommende Arrangementer"
          component={KommendeArrangementer}
        />*/}
      </Tab.Navigator>
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

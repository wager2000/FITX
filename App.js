import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // You can replace this with your preferred icon library
import Startscreen from "./Components/StartScreen";
import RegistrationScreen from "./Components/RegistrationScreen";
import SearchScreen from "./Components/SearchScreen";
import HistoryScreen from "./Components/History";
import StackNavigatorDetails from "./Components/StackNavigator/StackNavigatorDetails";
import StackNavigatorHistory from "./Components/StackNavigator/StackNavigatorHistory";
import LoginScreen from "./Components/LoginScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Start") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Details") {
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
        style: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="History" component={StackNavigatorHistory} />
      <Tab.Screen name="Details" component={StackNavigatorDetails} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration" headerShown="false">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Your custom styles here
});

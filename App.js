import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // You can replace this with your preferred icon library
import StackNavigatorDetails from "./Components/StackNavigator/StackNavigatorDetails";
import StackNavigatorHistory from "./Components/StackNavigator/StackNavigatorHistory";
import StackNavigatorSearch from "./Components/StackNavigator/StackNavigatorSearch";
import StackNavigatorStart from "./Components/StackNavigator/StackNavigatorStart";

import ChatScreen from "./Components/ChatScreen";

// AppRegistry.registerComponent('YourAppName', () => FITX);

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Start") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Chat") {
              // Use the "chatbox" icon for the "Chat" screen
              iconName = focused ? "chatbox" : "chatbox-outline";
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
        <Tab.Screen name="Start" component={StackNavigatorStart} />
        <Tab.Screen name="Search" component={StackNavigatorSearch} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="History" component={StackNavigatorHistory} />
        <Tab.Screen name="Details" component={StackNavigatorDetails} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  // Your custom styles here
});
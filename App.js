import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../FITX/Screens/LoginScreen';
import HomeScreen from '../FITX/Screens/HomeScreen';
import Startscreen from '../FITX/Screens/Startscreen';
import SettingsScreen from '../FITX/Screens/Settings';

import { AppRegistry } from 'react-native';

// AppRegistry.registerComponent('YourAppName', () => FITX);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }}name="Start" component={Startscreen} />
        <Stack.Screen options={{ headerShown: true }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
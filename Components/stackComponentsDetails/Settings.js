//Viktor
import React from "react";
import { View, Text, StyleSheet } from "react-native";

//Funktionen Settings returnerer et View med valg brugerne kan ændre på.
const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notification</Text>
        <Text style={styles.settingValue}>On</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <Text style={styles.settingValue}>English</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Theme</Text>
        <Text style={styles.settingValue}>Dark</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Sync Data</Text>
        <Text style={styles.settingValue}>Every hour</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Push Notifications</Text>
        <Text style={styles.settingValue}>Enabled</Text>
      </View>
    </View>
  );
};

//Styles til UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 18,
  },
  settingValue: {
    fontSize: 16,
    color: "gray",
  },
});

export default Settings;

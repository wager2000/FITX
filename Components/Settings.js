// Importering af nødvendige React og React Native komponenter og stilarter
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Funktionel komponent SettingsScreen
const SettingsScreen = () => {
  return (
    // Overordnet container til komponenten med hvid baggrundsfarve og padding
    <View style={styles.container}>
      {/* Overskrift for indstillinger */}
      <Text style={styles.header}>Settings</Text>

      {/* Individuelle indstillinger som settingItem-komponenter */}
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notification</Text>
        <Text style={styles.settingValue}>On</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language</Text>
        <Text style={styles.settingValue}>English</Text>
      </View>
      {/* Tilføj flere indstillinger efter behov */}

    </View>
  );
};

// Stildefinitioner for komponenten ved hjælp af StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white", // Baggrundsfarve for hele komponenten
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
    color: "gray", // Tekstfarve for indstillingsværdien
  },
});

// Eksporter SettingsScreen komponenten som standard
export default SettingsScreen;

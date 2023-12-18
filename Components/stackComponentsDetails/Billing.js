import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Billing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fakturering</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Korttype</Text>
        <TextInput style={styles.settingValue} placeholder="Indtast korttype" />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Kortnummer</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Indtast kortnummer"
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Udløbsdato</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Indtast udløbsdato"
        />
      </View>
    </View>
  );
};

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

export default Billing;
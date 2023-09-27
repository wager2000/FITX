import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Billing = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Billing</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Card Type</Text>
        <TextInput style={styles.settingValue} placeholder="Enter Card Type" />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Card Number</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Enter Card Number"
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Expiry Date</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Enter Expiry Date"
        />
      </View>
      {/* Add more billing information fields as needed */}
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

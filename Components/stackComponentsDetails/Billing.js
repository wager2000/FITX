import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const Billing = () => {
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = () => {
    // Handle form submission
    // ...

    // Clear the form fields after submission
    setCardType("");
    setCardNumber("");
    setExpiryDate("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Billing</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Card Type</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Enter Card Type"
          value={cardType}
          onChangeText={(text) => setCardType(text)}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Card Number</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Enter Card Number"
          value={cardNumber}
          onChangeText={(text) => setCardNumber(text)}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Expiry Date</Text>
        <TextInput
          style={styles.settingValue}
          placeholder="Enter Expiry Date"
          value={expiryDate}
          onChangeText={(text) => setExpiryDate(text)}
        />
      </View>

      {/* Submit button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
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
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Billing;

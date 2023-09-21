import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const History = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tjek dine Arrangementer</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Kommende Arrangementer')}
        >
          <Text style={styles.buttonText}>Kommende Arrangementer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Afsluttede Arrangementer')}
        >
          <Text style={styles.buttonText}>Afsluttede Arrangementer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: '#EFEFEF', // Light gray background
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Adjusted to leave space on both sides
    marginTop: 20, // Increased margin for better spacing
  },
  button: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#877F7E', // Light coral background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 8, // Added margin to separate buttons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default History;
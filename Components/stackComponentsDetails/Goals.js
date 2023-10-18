import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

const GoalsView = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  // Funktion til at tilføje et nyt mål
  const addGoal = () => {
    if (newGoal.trim() === '') {
      return; // Undgå at tilføje tomme mål
    }

    // Tilføj det nye mål til mållisten
    setGoals([...goals, newGoal]);
    setNewGoal(''); // Nulstil inputfeltet
  };

  return (
    <View>
      <Text>Opret og se dine mål:</Text>
      <TextInput
        placeholder="Skriv dit mål her"
        value={newGoal}
        onChangeText={(text) => setNewGoal(text)}
      />
      <Button title="Tilføj mål" onPress={addGoal} />

      <Text>Dine mål:</Text>
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
      />
    </View>
  );
};

export default GoalsView;

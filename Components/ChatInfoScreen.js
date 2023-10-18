import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const ChatInfoScreen = ({ navigation }) => {
  const handleStartChat = () => {
    // Navigate to the ChatScreen when the user clicks the "Start Chat" button
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{ uri: 'https://images.pexels.com/photos/4457913/pexels-photo-4457913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.backgroundImage}
      />

      <View style={styles.overlay}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8649/8649613.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Your SocialExChatbot</Text>
        <Text style={styles.description}>
          This friendly chatbot specializes in providing information and assistance related to various topics, with a primary focus on training and physical activities.
        </Text>
        <Text style={styles.instructions}>
          If you have questions or need guidance on training, fitness, or an active lifestyle, feel free to ask. Our chatbot is here to help you stay healthy and active!
        </Text>
        <Text style={styles.suggestions}>
          Looking for sports that promote social interaction? Ask us about sports like yoga, running, pilates, and more.
        </Text>
        <Text style={styles.suggestions}>
          Curious about activities offered by freelancers near you? Our chatbot has all the local knowledge. Just ask!
        </Text>
        <Button title="Start Chat" onPress={handleStartChat} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust the alpha (fourth value) to control the overlay opacity
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  suggestions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default ChatInfoScreen;

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
import ChatFaceData from './Services/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendMessage from './Services/RequestPage';
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

// URL til chatbotten ansigtsbillede

let CHAT_BOT_FACE = 'https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';

// Stildefinitioner til brugergrænsefladen
const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  inputToolbar: {
    backgroundColor: '#4d648d',
  },
  inputText: {
    color: 'white',
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
  bubbleRight: {
    backgroundColor: '#5E9BF2',
    borderRadius: 15,
    padding: 10,
  },
  bubbleLeft: {
    backgroundColor: '#e0e0e0',
  },
  bubbleTextRight: {
    padding: 10,
    color: 'white',
  },
  bubbleTextLeft: {
    padding: 10,
  },
  previousQuestions: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  previousQuestionsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  previousQuestionItem: {
    backgroundColor: '#e5e5e5', // Background color of each question
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  previousQuestionText: {
    color: 'black', // Text color
  },
  showHideButton: {
    backgroundColor: '#f0f0f0', // Background color of show/hide button
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  showHideButtonText: {
    color: '#000', // Text color of show/hide button
  },
});

export default function ChatScreen() {
  // Tilstande ved hjælp af React Hooks
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatFaceColor, setChatFaceColor] = useState();
  const [showPreviousQuestions, setShowPreviousQuestions] = useState(false);
  const [previousQuestions, setPreviousQuestions] = useState([]);

  // Standardbeskeder til chatbotten
  const messagesArray = [
    {
      role: "system",
      content: "You are a chatbot that should be focused on training. So if a customer asks or is interested in something regarding training or being active, please provide a great answer to their question. If a customer is interested in knowing which sport offers great focus on being social, mention sports such as yoga, running, pilates.",
    },
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistant",
      content: "Hello there traveler, how are you doing today?",
    }
  ];
  
  // Håndtering beskeder
  function MessageHandling(Msg) {
    const message = {
      role: "user",
      content: Msg,
    }
    messagesArray.push(message);
    return message;
  }
  // Effekthåndtering for opsætning
  useEffect(() => {
    checkFaceId();
  }, []);
  // Effekthåndtering for visning af tidligere spørgsmål
  useEffect(() => {
    if (showPreviousQuestions) {
      loadPreviousQuestions();
    }
  }, [showPreviousQuestions]);
  
  // Funktion til at ændre chatbot baseret på brugernes valg (bør slettes, da dette ikke er gældende for denne kode)
  const checkFaceId = async () => {
    const id = await AsyncStorage.getItem('chatFaceId');
    CHAT_BOT_FACE = id ? ChatFaceData[id].image : ChatFaceData[0].image;
    setChatFaceColor(ChatFaceData[id].primary);
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am ' + ChatFaceData[id].name + ', How can I help you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: CHAT_BOT_FACE,
        },
      },
    ])
  }

  // Funktion til at skifte visning af tidligere spørgsmål
  const togglePreviousQuestions = () => {
    setShowPreviousQuestions((prev) => !prev);
  };

  // Funktion til at indlæse tidligere stillede spørgsmål fra Firebase
  const loadPreviousQuestions = async () => {
    try {
      const questionCollectionRef = collection(db, 'Messages');
      const querySnapshot = await getDocs(query(questionCollectionRef, orderBy('timestamp', 'desc')));

      const previousQuestions = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.sender === 'user') {
          previousQuestions.push(data.text);
        }
      });
      setPreviousQuestions(previousQuestions);
    } catch (error) {
      console.error('Error loading previous questions:', error);
    }
  };

  // Håndtering af afsendelse af beskeder 
  const onSend = useCallback((userMessages = []) => {
    const newMessages = GiftedChat.append(userMessages, messagesArray);
    setMessages(newMessages);

    if (userMessages[0].text) {
      saveMessageToFirestore(userMessages[0].text, 'user');
      getBardResp(userMessages[0].text);
    }
  }, []);

  // Funktion til at gemme beskeder fra brugere i Firebase
  const saveMessageToFirestore = async (text, sender) => {
    try {
      const docRef = await addDoc(collection(db, 'Messages'), {
        text,
        sender,
        timestamp: new Date().toISOString(),
      });
      console.log('Message sent with ID: ', docRef.id);
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  }

  // Funktion til at få svar fra chatbotten
  const getBardResp = (msg) => {
    setLoading(true);
    MessageHandling(msg);
    SendMessage(messagesArray)
      .then(response => {
        if (response.data && response.data.BOT) {
          const responsemessage = {
            role: "assistant",
            content: response.data.BOT
          }
          messagesArray.push(responsemessage);
          setLoading(false);

          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: response.data.BOT,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            }
          }

          setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp));
        } else {
          setLoading(false);

          const chatAIResp = {
            _id: Math.random() * (9999999 - 1),
            text: "Sorry, I cannot help with it",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: CHAT_BOT_FACE,
            }
          }

          setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp));
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Funktion til at tilpasse beskedbobler
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: styles.bubbleRight,
          left: styles.bubbleLeft,
        }}
        textStyle={{
          right: styles.bubbleTextRight,
          left: styles.bubbleTextLeft,
        }}
      />
    );
  }

  // Funktion til at tilpasse inputværktøjslinjen
  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} textInputStyle={styles.inputText} />;
  }

  // Funktion til at tilpasse sendeikonet
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
        </View>
      </Send>
    );
  }
  // Funktion til at tilpasse visningen af tidligere spørgsmål
  const renderChatFooter = () => {
    if (showPreviousQuestions) {
      return (
        <View style={styles.previousQuestions}>
          <Text style={styles.previousQuestionsText}>Previous Questions:</Text>
          {previousQuestions.map((question, index) => (
            <View style={styles.previousQuestionItem} key={index}>
              <Text style={styles.previousQuestionText}>
                {question}
              </Text>
            </View>
          ))}
          <Button
            title="Hide Previous Questions"
            onPress={togglePreviousQuestions}
            color="black"
          />
        </View>
      );
    }
    return (
      <Button
        title="Show Previous Questions"
        onPress={togglePreviousQuestions}
        color="black"
      />
    );
  };

  return (
    <View style={styles.chatContainer}>
      <GiftedChat
        messages={messages}
        isTyping={loading}
        multiline={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderFooter={renderChatFooter}
      />
    </View>
  );
}

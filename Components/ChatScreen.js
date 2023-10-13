import { View, Text, Image } from 'react-native'
import React from 'react'
//GiftedChat er det vi bruger til at lave chatten
import { Bubble, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'

import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import ChatFaceData from './Services/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendMessage from './Services/RequestPage';

//Håndtere hvis der er fejl i AsyncStorage
CHAT_BOT_FACE='https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png'

export default function ChatScreen() {
  
  let messagesArray = [
    {
      role: "system",
      content: "You are a chatbot the only speaks in elvish languadge. You may not answer questions regarding fish and the market. Have a great focus on traning and being active together with people and support people with great knowledge about physics and stuff like that.",
    },
    {
      role: "user",
      content: "Hello",
    },
    {
      role: "assistant",
      content: "Hello there traveler, how are you doing today?",
    }
  ]

  function MessageHandling(Msg){
    const message = {
      role: "user",
      content: Msg,
    }
    messagesArray.push(message)
    return message
  }
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatFaceColor,setChatFaceColor]=useState();

    //Håndtere valgt af ChatBot
    useEffect(() => {
        checkFaceId();
    }, [])

    //Sætter den valgte chatbot til og sender den første besked
    const checkFaceId=async()=>{
        const id= await AsyncStorage.getItem('chatFaceId');
       CHAT_BOT_FACE= id?ChatFaceData[id].image: ChatFaceData[0].image;
       setChatFaceColor(ChatFaceData[id].primary);
       setMessages([
        {
          _id: 1,
          text: 'Hello, I am '+ChatFaceData[id].name+', How Can I help you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: CHAT_BOT_FACE,
        
        },
         
        },
      ])
    }

    //Håndtere Chatten
    const onSend = useCallback((messages = []) => {
       
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      if(messages[0].text)
      {
        getBardResp(messages[0].text);
      }
    }, [])
    //Håndtere API Kald og BOT Svar
    const getBardResp = (msg) => {
        setLoading(true)
        //SendMessage er vores funktion fra RequestPage.js
        MessageHandling(msg)
        SendMessage(messagesArray)
        .then(response => {
            // Extracting the AI's reply from `response.data.BOT`
            if (response.data && response.data.BOT) {
              const responsemessage = {
                role: "assistant",
                content: response.data.BOT
              }
              messagesArray.push(responsemessage)
                setLoading(false)
                
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
    
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
            } else {
                setLoading(false)
                
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
    
                setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
            }
        })
        .catch(error => {
            console.error(error);
            // Handle error further if needed
        });
    }

   const renderBubble =(props)=> {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#671ddf',
               
              },left:{
               
              }
             
            }}
            textStyle={{
                right:{
                    // fontSize:20,
                    padding:2
                },
                left: {
                  color: '#671ddf',
                  // fontSize:20,
                  padding:2
                }
              }}
          />
        )
      }

    const  renderInputToolbar =(props)=> {
        //Add the extra styles via containerStyle
       return <InputToolbar {...props} 
       containerStyle={{
       padding:3,
      
        backgroundColor:'#4d648d',
        color:'#fff',
        }} 
        
        textInputStyle={{ color: "#fff" }}
         />
     }

   const  renderSend=(props)=> {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 10, marginBottom: 5}}>
                <FontAwesome name="send" size={24} color="white" resizeMode={'center'} />
                   
                </View>
            </Send>
        );
    }
  return (
    <View style={{ flex: 1,backgroundColor:'#fff' }}>

      <GiftedChat
      messages={messages}
      isTyping={loading}
      multiline ={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      
      }}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar} 
      renderSend={renderSend}
    />
    
    
    </View>
  )
}
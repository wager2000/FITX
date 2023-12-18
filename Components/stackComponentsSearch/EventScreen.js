import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

import crossJumpImage from './../../assets/Places/crossfit.jpeg';
import Yoga from './../../assets/Places/crossfit.jpeg';

const imageMapping = {
  Crossjump: crossJumpImage,
  HenrikYoga: Yoga,
};

const EventScreen = ({ route }) => {
  const { placeName } = route.params;
  const [events, setEvents] = useState([]);
  const [placeInfo, setPlaceInfo] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, 'Arrengementer');
        const q = query(eventsRef, where('Place', '==', placeName));
        const querySnapshot = await getDocs(q);
        const eventList = querySnapshot.docs.map((doc) => doc.data());
        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchPlaceInfo = async () => {
      const placesRef = collection(db, 'Places');
      const placeQuery = query(placesRef, where('Name', '==', placeName));
      const placeSnapshot = await getDocs(placeQuery);

      if (!placeSnapshot.empty) {
        const placeDoc = placeSnapshot.docs[0];
        setPlaceInfo(placeDoc.data());
      }
    };

    fetchEvents();
    fetchPlaceInfo();
  }, [placeName]);

  const placeImage = imageMapping[placeName.toLowerCase()] || crossJumpImage;

  return (
    <ScrollView style={styles.container}>
      {placeInfo && (
        <View style={styles.placeInfo}>
          <Text style={styles.placeInfoTitle}>{placeInfo.Name}</Text>
          <Text style={styles.placeInfoCategory}>Category: {placeInfo.Category}</Text>
          <Text style={styles.placeInfoDescription}>Description: {placeInfo.Description}</Text>
          <Text style={styles.placeInfoNiveau}>Niveau: {placeInfo.Niveau}</Text>
          <Image source={placeImage} style={styles.placeImage} />
        </View>
      )}

      {events.map((event, index) => (
        <View key={index} style={styles.eventCard}>
          <Text style={styles.eventTitle}>Event at {event.Place}</Text>
          <Text style={styles.eventDetail}>Date: {event.Date.toDate().toDateString()}</Text>
          <Text style={styles.eventDetail}>Sport: {event.Sport}</Text>
          <Text style={styles.eventPrice}>Price: ${event.Price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  placeInfo: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  placeInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  placeInfoCategory: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666666',
  },
  placeInfoDescription: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666666',
  },
  placeInfoNiveau: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666666',
  },
  placeImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
    borderRadius: 8,
  },
  eventCard: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  eventImage: {
    width: '100%',
    height: 250,
    marginBottom: 16,
    borderRadius: 8,
  },
  eventDetail: {
    fontSize: 18,
    marginBottom: 8,
    color: '#666666',
  },
  eventPrice: {
    fontSize: 20,
    color: '#FF5733', // Highlight the price with a different color
  },
});

export default EventScreen;

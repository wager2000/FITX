import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const EventScreen = ({ route }) => {
  const { placeName } = route.params;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      // Create a reference to the 'Arrangementer' collection
      const eventsRef = collection(db, 'Arrengementer');

      // Query for events where the 'Place' field matches the selected place name
      const q = query(eventsRef, where('Place', '==', placeName));

      try {
        const querySnapshot = await getDocs(q);
        const eventList = querySnapshot.docs.map((doc) => {
          return doc.data();
        });

        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [placeName]);

  return (
    <ScrollView style={styles.container}>
      {events.map((event, index) => (
        <View key={index} style={styles.eventCard}>
          <Text style={styles.eventTitle}>{event.Place}</Text>
          <Text style={styles.eventDetail}>Date: {event.Date.toDate().toDateString()}</Text>
          <Text style={styles.eventDetail}>Sport: {event.Sport}</Text>
          <Text style={styles.eventDetail}>Price: ${event.Price}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  eventCard: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDetail: {
    fontSize: 16,
    marginVertical: 4,
  },
});


export default EventScreen;

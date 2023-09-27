import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const KommendeArrangementer = () => {
    const [arrangementerData, setArrangementerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const arrangementerCollection = collection(db, 'Arrengementer');
        const snapshot = await getDocs(arrangementerCollection);
        const currentDate = new Date(); // Get the current date

        const data = snapshot.docs
          .map((doc) => {
            const eventData = doc.data();
            const dateFirebase = eventData.Date.toDate();

            // Compare the event date with the current date
            if (dateFirebase > currentDate) {
              const date = dateFirebase.toLocaleString();

              return {
                id: doc.id,
                Sport: eventData.Sport.toUpperCase(),
                Date: date,
                Price: eventData.Price,
              };
            }

            return null; // Return null for items with future dates
          })
          .filter((item) => item !== null); // Filter out null items

        setArrangementerData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={arrangementerData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.arrangementContainer}>
            <View style={styles.arrangement}>
              <Text style={styles.sport}>Sport: {item.Sport}</Text>
              <Text style={styles.dato}>Dato: {item.Date}</Text>
              <Text style={styles.pris}>Pris: {item.Price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Background color for the entire page
  },
  arrangementContainer: {
    marginBottom: 16,
  },
  arrangement: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sport: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dato: {
    fontSize: 16,
    color: '#555', // Date text color
    marginBottom: 4,
  },
  pris: {
    fontSize: 16,
    color: '#555', // Price text color
  },
});

export default KommendeArrangementer;


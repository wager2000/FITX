import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const KommendeArrangementer = () => {
  const [arrangementerData, setArrangementerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hent en samling (collection) fra Firebase-databasen
        const arrangementerCollection = collection(db, 'Arrengementer');
        const snapshot = await getDocs(arrangementerCollection);
        const currentDate = new Date(); // Få den aktuelle dato

        // Behandle snapshottet af data fra Firebase-databasen
        const data = snapshot.docs
          .map((doc) => {
            const eventData = doc.data();
            const dateFirebase = eventData.Date.toDate();

            // Sammenlign begivenhedsdatoen med den aktuelle dato
            if (dateFirebase > currentDate) {
              const date = dateFirebase.toLocaleString();

              return {
                id: doc.id,
                Sport: eventData.Sport.toUpperCase(),
                Date: date,
                Price: eventData.Price,
              };
            }

            return null; // Returnér null for elementer med fremtidige datoer
          })
          .filter((item) => item !== null); // Filtrer null-elementer fra

        // Opdater state med kommende arrangementer
        setArrangementerData(data);
      } catch (error) {
        console.error('Fejl ved hentning af data:', error);
      }
    };

    fetchData(); // Kald fetchData funktionen
  }, []); // Den tomme array som anden parameter sikrer, at useEffect kun køres ved komponentens montering

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

// Stildefinitioner for komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Baggrundsfarve for hele siden
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
    color: '#555', // Tekstfarve for dato
    marginBottom: 4,
  },
  pris: {
    fontSize: 16,
    color: '#555', // Tekstfarve for pris
  },
});

export default KommendeArrangementer; // Eksporterer komponenten
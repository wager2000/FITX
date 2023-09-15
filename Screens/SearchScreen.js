import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from '../firebaseConfig';



const SearchScreen = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {

    
    // Fetch places from Firestore
    const fetchPlaces = async () => {
        const placesRef = collection(db, 'Places');
        const querySnapshot = await getDocs(placesRef);
      
        const places = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          places.push(data);
        });
      
        console.log('Fetched Places:', places);
      };
      
      // Call the function to fetch places
      fetchPlaces();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          // You can add onChangeText and value props to handle search functionality
        />
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.6761,
          longitude: 12.5683,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Add markers for each place */}
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.Place.latitude,
              longitude: place.Place.longitude,
            }}
            title={place.Name}
            description={place.Description}
          />
        ))}
      </MapView>
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchContainer: {
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#DDDDDD',
    },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
    },
    map: {
      flex: 1,
    },
  });
  
  export default SearchScreen;
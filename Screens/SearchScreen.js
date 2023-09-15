import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SearchScreen = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Create a reference to the "Places" collection
    const placesRef = collection(db, "Places");

    // Fetch places from Firestore initially
    const fetchPlaces = async () => {
      const querySnapshot = await getDocs(placesRef);
      const placesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id; // Retrieve the unique ID
        return { id, ...data };
      });

      setPlaces(placesData);
    };

    // Call the function to fetch places initially
    fetchPlaces();

    // Set up a real-time listener to update places on changes
    const unsubscribe = onSnapshot(placesRef, (querySnapshot) => {
      const placesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id; // Retrieve the unique ID
        return { id, ...data };
      });

      setPlaces(placesData);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
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
            key={place.id} // Use a unique key, e.g., place.id
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  map: {
    flex: 1,
  },
});

export default SearchScreen;

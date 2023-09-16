import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Slider from "@react-native-community/slider";

const SearchScreen = () => {
  const [places, setPlaces] = useState([]);
  const [region, setRegion] = useState({
    latitude: 55.6761,
    longitude: 12.5683,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [radius, setRadius] = useState(500); // Initial radius in meters

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

  const handleRadiusChange = (newRadius) => {
    // Update the radius when the user changes it
    setRadius(newRadius);
  };

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
        region={region} // Use the dynamic region
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
        {/* Add a Circle to represent the radius */}
        <Circle
          center={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          radius={radius}
          fillColor="rgba(0, 0, 255, 0.2)"
          strokeColor="blue"
        />
      </MapView>
      {/* Display the radius value */}
      <View style={styles.radiusContainer}>
        <Text style={styles.radiusText}>Radius: {radius} meters</Text>
        <Slider
          style={styles.radiusSlider}
          step={100}
          minimumValue={100}
          maximumValue={2000}
          value={radius}
          onValueChange={handleRadiusChange}
        />
      </View>
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
  radiusContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  radiusText: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  radiusSlider: {
    width: 200,
  },
});

export default SearchScreen;

import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
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
  const [radius, setRadius] = useState(1000); // Initial radius in meters

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

  const handleZoom = (value) => {
    // Update the radius when the slider value changes
    setRadius(value);
  };

  const handleRegionChange = (newRegion) => {
    // Update the map's region
    setRegion(newRegion);
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
        region={region}
        onRegionChange={handleRegionChange} // Update the region when it changes
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
            pinColor={
              // Check if the marker is inside the circle
              region &&
              place.Place.latitude &&
              place.Place.longitude &&
              Math.sqrt(
                Math.pow(region.latitude - place.Place.latitude, 2) +
                  Math.pow(region.longitude - place.Place.longitude, 2)
              ) * 100000 <= radius
                ? "green"
                : "red"
            }
          />
        ))}

        {/* Add a circle */}
        <Circle
          center={region}
          radius={radius} // Use the dynamic radius
          fillColor="rgba(0, 0, 255, 0.2)" // Adjust fill color as needed
          strokeColor="rgba(0, 0, 255, 0.5)" // Adjust stroke color as needed
        />
      </MapView>
      <View style={styles.sliderContainer}>
        <Text>Radius: {radius} meters</Text>
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={5000}
          step={100}
          value={radius}
          onValueChange={handleZoom}
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
  sliderContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  slider: {
    flex: 1,
  },
});

export default SearchScreen;
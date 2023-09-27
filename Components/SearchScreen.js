import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button, Image, Text} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps"; // Import Circle component
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Card, Title, Paragraph } from "react-native-paper";
import * as Location from "expo-location";
import Slider from '@react-native-community/slider';

const SearchScreen = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Store user's location
  const [initialRegion, setInitialRegion] = useState({
    latitude: 55.6761, // Default latitude if user location is not available
    longitude: 12.5683, // Default longitude if user location is not available
    latitudeDelta: 0.02, // Smaller value for closer zoom
    longitudeDelta: 0.02, // Smaller value for closer zoom
  });
  const [radiusKm, setRadiusKm] = useState(1); // Initial radius of 1 km

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

  // Function to handle the search and focus on the selected place
  const handleSearch = () => {
    const placeToSearch = searchQuery.trim();
    const selected = places.find((place) => place.Name === placeToSearch);
    if (selected) {
      setSelectedPlace(selected);
    } else {
      setSelectedPlace(null);
      // Handle case when the place is not found
    }
  };

  // Get the user's location on component mount
  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        console.log("User location:", location.coords);
        setUserLocation(location.coords);

        // Update the initial region with the user's location
        if (location.coords) {
          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          });
        }
      } catch (error) {
        console.error("Error getting location: ", error);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <MapView
        style={styles.map}
        region={initialRegion}
        
      >
        {/* Add a Circle component for the user's location */}
        {userLocation && (
          <Circle
            center={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            radius={radiusKm * 1000} // Convert kilometers to meters
            fillColor="rgba(0, 0, 255, 0.5)" // Blue color with transparency
            strokeColor="rgba(0, 0, 255, 1)" // Blue color without transparency
          />
        )}

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
            onPress={() => setSelectedPlace(place)}
          >
            <Image
              source={require("../assets/location-pin.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
        ))}
        
      </MapView>
      {selectedPlace && (
         <Card style={styles.card}>
         <Card.Cover
           source={require("../assets/Cross.jpeg")} // Add a background image for the card
           style={styles.cardCover}
         />
         <Card.Content>
           <Title style={styles.cardTitle}>{selectedPlace.Name}</Title>
           <Paragraph style={styles.cardText}>
             Description: {selectedPlace.Description}
           </Paragraph>
           <Paragraph style={styles.cardText}>
             Category: {selectedPlace.Category}
           </Paragraph>
           <Paragraph style={styles.cardText}>
             Niveau: {selectedPlace.Niveau}
           </Paragraph>
         </Card.Content>
       </Card>
      )}
    {!selectedPlace && ( // Render the Slider only when selectedPlace is null
      <View>
       <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10} // You can adjust the maximum value as needed
          step={1}
          value={radiusKm}
          onValueChange={(value) => setRadiusKm(value)}
        />
        <Text style={styles.sliderText}>Radius: {radiusKm} km</Text>
      </View>
    )}
  </View>
);

};

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#F0F0F0", // Background color for the search container
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF", // Background color for the search input
  },
  map: {
    flex: 1,
  },
  card: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    elevation: 4,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  cardCover: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 150,
  },
  cardTitle: {
    fontSize: 24,
    marginBottom: 8,
    color: "#333333", // Text color for the title
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666666", // Text color for description, category, and niveau
  },
  cardCategory: {
    color: "#007AFF", // Text color for the category
    fontWeight: "bold",
  },
  cardNiveau: {
    color: "#4CAF50", // Text color for the niveau
    fontWeight: "bold",
  },
});

export default SearchScreen;
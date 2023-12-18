// Importering af nødvendige React og React Native komponenter og biblioteker
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps"; // Importer Circle-komponenten
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Card, Title, Paragraph } from "react-native-paper";
import * as Location from "expo-location";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

// Funktionel komponent SearchScreen
const SearchScreen = () => {
  // State-variabler til håndtering af data og interaktioner i komponenten
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // Gemmer brugerens placering
  const [initialRegion, setInitialRegion] = useState({
    latitude: 55.6761, // Standardbredde, hvis brugerens placering ikke er tilgængelig
    longitude: 12.5683, // Standardlængde, hvis brugerens placering ikke er tilgængelig
    latitudeDelta: 0.04, // Mindre værdi for tættere zoom
    longitudeDelta: 0.04, // Mindre værdi for tættere zoom
  });
  const [radiusKm, setRadiusKm] = useState(1); // Initial radius på 1 km
  const navigation = useNavigation(); // Hent navigation objektet fra React Navigation

  // Navigationsfunktion til EventScreen
  const navigateToEventScreen = (placeName) => {
    navigation.navigate("EventScreen", { placeName });
  };

  // Funktion til håndtering af tryk på et Card-element
  const handleCardPress = (place) => {
    setSelectedPlace(place);
    navigateToEventScreen(place.Name);
  };

  // Funktion til at gå til brugerens nuværende placering
  const goToCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      console.log("User location:", location.coords);

      // Opdater state med brugerens placering
      setUserLocation(location.coords);

      // Opdater kortets region til brugerens nuværende placering
      if (location.coords) {
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    } catch (error) {
      console.error("Error getting location: ", error);
    }
  };

  // Funktion til at lukke det åbne Card-element
  const closeCard = () => {
    setSelectedPlace(null);
  };

  // Effekt til at hente steder fra Firestore ved komponentens oprettelse
  useEffect(() => {
    // Opret reference til Firestore-samlingen "Places"
    const placesRef = collection(db, "Places");

    // Funktion til at hente steder fra Firestore
    const fetchPlaces = async () => {
      const querySnapshot = await getDocs(placesRef);
      const placesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id; // Hent den unikke ID
        return { id, ...data };
      });

      setPlaces(placesData);
    };

    // Kald funktionen til at hente steder ved komponentens oprettelse
    fetchPlaces();

    // Opsæt en realtidslytter til at opdatere steder ved ændringer
    const unsubscribe = onSnapshot(placesRef, (querySnapshot) => {
      const placesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id; // Hent den unikke ID
        return { id, ...data };
      });

      setPlaces(placesData);
    });

    // Rens op i lytteren når komponenten afmonteres
    return () => {
      unsubscribe();
    };
  }, []);

  // Funktion til håndtering af søgning og fokus på det valgte sted
  const handleSearch = () => {
    const placeToSearch = searchQuery.trim();
    const selected = places.find((place) => place.Name === placeToSearch);
    if (selected) {
      setSelectedPlace(selected);
      // Opdater kortets region for at fokusere på det valgte sted
      setInitialRegion({
        latitude: selected.Place.latitude,
        longitude: selected.Place.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    } else {
      setSelectedPlace(null);
      // Håndter tilfælde, hvor stedet ikke findes
    }
  };

  // Hent brugerens placering ved komponentens oprettelse
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

        // Opdater den initielle region med brugerens placering
        if (location.coords) {
          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          });
        }
      } catch (error) {
        console.error("Error getting location: ", error);
      }
    };

    getLocation();
  }, []);

  // Render komponentens UI
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
        {/* Erstat "Go to Current Location" knappen med et brugerdefineret ikon */}
      </View>
      <MapView style={styles.map} region={initialRegion}>
        <TouchableOpacity onPress={goToCurrentLocation}>
          <Image
            source={require("../assets/gps.png")} // Erstat med stien til dit brugerdefinerede ikon
            style={styles.customIcon}
          />
        </TouchableOpacity>
        {/* Tilføj en Circle-komponent for brugerens placering */}
        {userLocation && (
          <Circle
            center={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            radius={radiusKm * 1000} // Konverter kilometer til meter
            fillColor="rgba(0, 0, 255, 0.5)" // Blå farve med gennemsigtighed
            strokeColor="rgba(0, 0, 255, 1)" // Blå farve uden gennemsigtighed
          />
        )}

        {/* Tilføj markører for hvert sted */}
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
          <TouchableOpacity
            onPress={() => navigateToEventScreen(selectedPlace.Name)}
          >
            <Image
              source={require("../assets/close.png")} // Erstat med stien til dit lukkeikon
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Card.Cover
            source={require("../assets/Cross.jpeg")}
            style={styles.cardCover}
          />
          <TouchableOpacity
            onPress={() => navigateToEventScreen(selectedPlace.Name)}
          >
            <Card.Content>
              <Title style={styles.cardTitle}>{selectedPlace.Name}</Title>
              <Paragraph style={styles.cardText}>
                Beskrivelse: {selectedPlace.Description}
              </Paragraph>
              <Paragraph style={styles.cardText}>
                Kategori: {selectedPlace.Category}
              </Paragraph>
              <Paragraph style={styles.cardText}>
                Niveau: {selectedPlace.Niveau}
              </Paragraph>
            </Card.Content>
          </TouchableOpacity>
        </Card>
      )}
      {!selectedPlace && ( // Vis Slideren kun når selectedPlace er null
        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10} // Du kan justere den maksimale værdi efter behov
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

// Stildefinitioner for komponenten
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#F0F0F0", // Baggrundsfarve for søgecontaineren
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
    backgroundColor: "#FFFFFF", // Baggrundsfarve for søgeinput
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
    color: "#333333", // Tekstfarve for titlen
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666666", // Tekstfarve for beskrivelse, kategori og niveau
  },
  customIcon: {
    width: 40, // Angiv bredden på dit brugerdefinerede ikon (mindre størrelse)
    height: 40,
    left: 340,
    top: 10,
  },
  closeButton: {
    top: -5,
    left: 290,
    zIndex: 1,
  },
  closeIcon: {
    width: 30, // Angiv bredden på dit lukkeikon
    height: 30, // Angiv højden på dit lukkeikon
  },
  slider: {
    // Stildefinitioner for Slideren
  },
  sliderText: {
    // Stildefinitioner for tekst over Slideren
  },
});

// Eksporter SearchScreen komponenten som standard
export default SearchScreen;

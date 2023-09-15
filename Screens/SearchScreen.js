import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const SearchScreen = () => {
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
  {/* Add markers or other map components as needed */}
  <Marker
    coordinate={{
      latitude: 55.6761,
      longitude: 12.5683,
    }}
    title="Copenhagen"
    description="Capital of Denmark"
  />
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

import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const Startscreen = () => {
  return (
    <ScrollView horizontal style={styles.container}>
      {[1, 2, 3, 4, 5].map((list, index) => (
        <View key={index} style={styles.listContainer}>
          <Text style={styles.listTitle}>Liste {list}</Text>
          <Swiper style={styles.swiper} vertical>
            <Image source={require('../assets/Cross.jpeg')} style={styles.image} />
            <Image source={require('../assets/mindful_yoga_aarhus.jpeg')} style={styles.image} />
            {/* Tilføj flere billeder her */}
          </Swiper>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  swiper: {
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 5,
  },
});

export default Startscreen;
import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

const HomeScreen = ({ navigation }) => {
  const navigateToLogin = () => {
    navigation.navigate("Login"); // Replace with the name of your login screen
  };

  const navigateToRegistration = () => {
    navigation.navigate("Registration"); // Replace with the name of your registration screen
  };

  return (
    <ScrollView horizontal style={styles.container}>
      {[1, 2, 3, 4, 5].map((list, index) => (
        <View key={index} style={styles.listContainer}>
          <Text style={styles.listTitle}>Liste {list}</Text>
          <Swiper style={styles.swiper} vertical>
            <Image
              source={require("../assets/Cross.jpeg")}
              style={styles.image}
            />
            <Image
              source={require("../assets/mindful_yoga_aarhus.jpeg")}
              style={styles.image}
            />
            {/* Add more images here */}
          </Swiper>
        </View>
      ))}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToRegistration} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: 120,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default HomeScreen;

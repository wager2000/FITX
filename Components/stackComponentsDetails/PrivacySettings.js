//Viktor
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, } from 'react-native';

//Funktionen PrivacySettings returnerer et View med valg brugerne kan ændre på.
//Disse valg er om brugeren vil dele sin lokation, om brugeren vil give adgang til kameraet og om brugeren vil dele data med appen.
//Hver valgmulighed har en switch, således at brugeren kan ændre på valget.
const PrivacySettings = () => {
  const [locationPrivacy, setLocationPrivacy] = useState(true);
  const [contactPrivacy, setContactPrivacy] = useState(true);
  const [notificationPrivacy, setNotificationPrivacy] = useState(true);

  const toggleLocationPrivacy = () => {
    setLocationPrivacy((prevState) => !prevState);
  };

  const toggleContactPrivacy = () => {
    setContactPrivacy((prevState) => !prevState);
  };

  const toggleNotificationPrivacy = () => {
    setNotificationPrivacy((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Privacy Settings</Text>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Share Location</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={locationPrivacy ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleLocationPrivacy}
          value={locationPrivacy}
        />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Camera Access</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={contactPrivacy ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleContactPrivacy}
          value={contactPrivacy}
        />
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>Analytics Data</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificationPrivacy ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotificationPrivacy}
          value={notificationPrivacy}
        />
      </View>
    </View>
  );
};

//Styles til UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
  },
});

export default PrivacySettings;

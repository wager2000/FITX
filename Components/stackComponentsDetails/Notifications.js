//Viktor
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const NotificationSettings = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification Settings</Text>
      <Text style={styles.subheader}>Enable or disable notifications:</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Notifications:</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isNotificationEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotification}
          value={isNotificationEnabled}
        />
      </View>
    </View>
  );
};

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
  subheader: {
    fontSize: 18,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default NotificationSettings;

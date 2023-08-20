import axios from 'axios';
import { Alert } from 'react-native';
import { IP_ADDRESS } from '../constants/constants';

// mark notification as read
export const handleNotificationPress = (item) => {
    axios.put(`${IP_ADDRESS}/api/notifications/markRead`, { userID: userID, notificationID: item._id })
      .then((response) => {
        Alert.alert('Success', 'Notification marked as read.');
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', error);
      });
  };

// accept request and call the backend to update the database
export const handleNotificationAccept = (item) => {
    axios.put(`${IP_ADDRESS}/api/notifications/accept`, { userID: userID, notificationID: item._id })
      .then((response) => {
        Alert.alert('Success', 'Game Confirmed. You will receive an email with your opponent\'s contact information. Make sure to check your spam folder!');
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', error);
      });
  };

// decline request works the same as mark as read
export const handleNotificationDecline = (item) => {
    axios.put(`${IP_ADDRESS}/api/notifications/markRead`, { userID: userID, notificationID: item._id })
      .then((response) => {
        Alert.alert('Success', 'Game Declined.');
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', error);
      });
  };
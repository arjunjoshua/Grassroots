import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/stylesHomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { handleNotificationAccept, handleNotificationDecline, handleNotificationPress } from './handleNotification';
import { set } from 'mongoose';

//render notification based on category
export const renderNotification = (item, userID, setNotifications) => {
    return (
      <TouchableOpacity>
        {item.category === 'request' ? (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationTeam}>{item.interested_team_name}`</Text>
            <Text style={styles.notificationDate}>
              {new Date(item.date).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleNotificationAccept(item, userID, setNotifications)}
              >
                <Icon name="check" size={15} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => handleNotificationDecline(item, userID, setNotifications)}
              >
                <Icon name="times" size={15} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationDate}>
              {new Date(item.date).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleNotificationPress(item, userID, setNotifications)}
              >
                <Icon name="check" size={15} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

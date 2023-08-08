import { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Badge, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IP_ADDRESS } from '../constants/constants';
import { styles } from '../components/stylesHomeScreen';

const HomeScreen = ({ route, navigation }) => {
  const { token, userID } = route.params;
  const [teams, setTeams] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get(`${IP_ADDRESS}:5000/api/teamsInfo`, { params: { userID } }) 
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', 'Error retrieving teams. Please try again later.');
      });

    axios.get(`${IP_ADDRESS}:5000/api/notifications`, { params: {userID} })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        Alert.alert('Error', 'Error retrieving notifications. Please try again later.');
      });
  }, []);

  const handleNotificationPress = (item) => {
    axios.put(`${IP_ADDRESS}:5000/api/notifications`, { userID: userID, notificationID: item._id })
      .then((response) => {
        Alert.alert('Success', 'Notification marked as read.');
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', error);
      });
  };

  const handleNotificationAccept = (item) => {
    axios.put(`${IP_ADDRESS}:5000/api/notifications/accept`, { userID: userID, notificationID: item._id })
      .then((response) => {
        Alert.alert('Success', 'Game Confirmed.');
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', error);
      });
  };

  const handleNotificationDecline = (item) => {
    axios.put(`${IP_ADDRESS}:5000/api/notifications`, { userID: userID, notificationID: item._id })
      .then((response) => {
        Alert.alert('Success', 'Game Declined.');
        setNotifications(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', error);
      });
  };

  const renderNotification = ({ item }) => (
     <TouchableOpacity /*onPress={() => handleNotificationPress(item)}*/>
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationMessage}>{item.message}</Text>  
        <Text style={styles.notificationTeam}>{item.interested_team_name}</Text>
        <Text style={styles.notificationDate}>{new Date(item.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.acceptButton} onPress={() => handleNotificationAccept(item)}>
            <Icon name="check" size={15} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton} onPress={() => handleNotificationDecline(item)}>
            <Icon name="times" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTeam = ({ item }) => (
    <View style={styles.teamContainer}>
      <Text style={styles.team_name}>{item.team_name}</Text>
      <Text style={styles.team_info}>{item.age_group}</Text>
      <Text style={styles.team_info}>Level: {item.proficiency_level}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Teams: </Text>
        <IconButton
          icon={() => <Badge size={10} style={styles.badge}>{notifications.length}</Badge>}
          color="black"
          size={20}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <FlatList
        data={teams}
        renderItem={renderTeam}
        keyExtractor={(item) => item._id}
      />

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={ () => { 
          setModalVisible(!modalVisible); 
        } }
      >
        <View style={styles.modalView}>
          <TouchableOpacity 
          onPress={ () => { setModalVisible(!modalVisible); } }
             style={styles.closeButton}>
            <MaterialCommunityIcons name="close" color="#333" size={24} />
          </TouchableOpacity>
          {notifications.length === 0 ? (
            <Text style={styles.modalText}>You have no new notifications</Text>
          ) : (
            <FlatList
              data={notifications}
              renderItem={renderNotification}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

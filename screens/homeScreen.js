import { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IP_ADDRESS } from '../constants/constants';
import { styles } from '../styles/stylesHomeScreen';
import { renderNotification } from '../utils/renderNotification';
import { renderTeam } from '../utils/renderTeam';

const HomeScreen = ({ route, navigation }) => {
  const { token, userID } = route.params;
  const [teams, setTeams] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // get teams and notifications on page load
  useEffect(() => {
    axios.get(`${IP_ADDRESS}/api/teams/teamInfo`, { params: { userID } }) 
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', 'Error retrieving teams. Please try again later.');
      });

    axios.get(`${IP_ADDRESS}/api/notifications/getNotifs`, { params: {userID} })
      .then((response) => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        Alert.alert('Error', 'Error retrieving notifications.');
      });
  }, []);
  
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Teams: </Text>
          <View style={styles.notificationButtonContainer}>
          <Button
            // Use a bell icon for notifications
            icon= {( {size, color }) => <MaterialCommunityIcons 
             name="bell" color={color} size={30} />}  
            textColor='black'
            onPress={() => setModalVisible(true)}
            style={styles.buttonNotification}
            contentStyle={styles.buttonContent}
          >
            {notifications.length > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{notifications.length}</Text>
              </View>
            )}
          </Button>
          </View>
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
              renderItem={({ item }) => renderNotification(item, userID, setNotifications)}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

import { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Badge, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IP_ADDRESS } from '../constants/constants';
import { set } from 'mongoose';

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

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>{new Date(item.date).toLocaleString()}</Text>
    </View>
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
          color="#000"
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
              renderItem={({ item }) => <Text style={styles.modalText}>{item.message}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  teamContainer: {
    backgroundColor: '#1fff1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height : 75,
    width : 350,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  team_name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  team_info: {
    fontSize: 15,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    zIndex: 2,
  },
  notificationContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationMessage: {
    fontSize: 16,
  },
  notificationDate: {
    fontSize: 14,
    color: '#888',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    marginTop: 100,
    width: 400,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});


export default HomeScreen;

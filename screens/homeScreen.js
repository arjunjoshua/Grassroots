import { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';

const HomeScreen = ({ route, navigation }) => {
  const { token, userID } = route.params;
  const [teams, setTeams] = useState([]);

  // const handleCreateTeam = () => {
  //   const token = route.params.token;
  //   navigation.navigate('CreateTeam', { token,  userID });
  // };

  useEffect(() => {
    axios.get(`${IP_ADDRESS}:5000/api/teamsInfo`, { params: { userID } }) 
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
        Alert.alert('Error', 'Something went wrong! Please try again later.');
      });
  }, []);

  const renderTeam = ({ item }) => (
    <View style={styles.teamContainer}>
      <Text style={styles.team_name}>{item.team_name}</Text>
      <Text style={styles.team_info}>{item.age_group}</Text>
      <Text style={styles.team_info}>Level: {item.proficiency_level}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Teams: </Text>
      <FlatList
        data={teams}
        renderItem={renderTeam}
        keyExtractor={(item) => item._id}
      />
      {/* <Button title="Create Team" onPress={handleCreateTeam} style={styles.button} /> */}
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
  button: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#2196f3',
    borderRadius: 5,
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
  }
});

export default HomeScreen;

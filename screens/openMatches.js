import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/stylesOpenMatches.js';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';
import { Picker } from '@react-native-picker/picker';

const OpenMatchesScreen = ({ navigation, route }) => {
  const [ageGroup, setAgeGroup] = useState('');
  const [matches, setMatches] = useState([]);
  const { userID } = route.params;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (ageGroup) {
      axios
        .get(`${IP_ADDRESS}/api/matchPost/openMatches`, { params: { ageGroup, userID } })
        .then(response => setMatches(response.data.matchPosts))
        .catch(error => console.error('There was an error!', error));
    }
      axios 
        .get(`${IP_ADDRESS}/api/teams/teamInfo`, { params: { userID: userID } })
        .then(response => setTeams(response.data))
        .catch(error => console.error('There was an error!', error));
  }, [ageGroup]);

  const handleTeamChange = (teamID) => {
    const selectedTeam = teams.find(team => team._id === teamID);
    setSelectedTeam(selectedTeam);
    setAgeGroup(selectedTeam.age_group);
  }

    const MatchItem = ({ item }) => {
      const [isInterested, setIsInterested] = useState(false);

      const dateObject = new Date(item.date);
      const timeObject = new Date(item.time);

      // Adjust for timezone
      timeObject.setHours(timeObject.getHours() - 1);

      const formattedDate = dateObject.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      const formattedTime = timeObject.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });

      const toggleInterest = () => {
        axios
              .post(`${IP_ADDRESS}/api/matchPost/interested`, { matchID: item._id, userID, isInterested: !isInterested, 
                teamID: selectedTeam._id })
              .then(response => {
                if(response.data.status === 'success') 
                  setIsInterested(!isInterested);
                else
                  Alert.alert('Error', 'Your interest could not be recorded at this time. Please try again later.');
      })
              .catch(error => {
                console.error(error);
              });
      };
      useEffect(() => {
        if (item.interested_users.includes(userID)) {
            setIsInterested(true);
        }
    }, [item]);

      return (
          <View style={styles.matchContainer}>
              <Text>{item.pitchName}</Text>
              <Text>{item.pitchLocation}</Text>
              <Text>{formattedDate}</Text>
              <Text>{formattedTime}</Text>
              <TouchableOpacity 
                style={{backgroundColor: isInterested ? 'green' : 'grey'}}
                onPress={toggleInterest}
            >
                <Text style={{color: 'white'}}> Interested </Text>
            </TouchableOpacity>

          </View>
      );
  };

  const renderMatch = ({ item }) => <MatchItem item={item} />;

  return (
    <View style={styles.container}>
      <Text>Select Your Team:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTeam?._id}
          onValueChange={(itemValue, itemIndex) => handleTeamChange(itemValue)}
        >
          {teams.map((team, index) => (
            <Picker.Item key={index} label={team.team_name} value={team._id} />
          ))}
        </Picker>
      </View>

        {
        matches.length > 0 ?
        (
            <FlatList
            data={matches}
            renderItem={renderMatch}
            keyExtractor={item => item._id}
            />
        ) : 
        (
            <Text style={styles.noMatchesText}>No available matches in this age group</Text>
        )
        }
    </View>
  );
};

export default OpenMatchesScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';

function CreateTeam({ route, navigation }) {
  const [teamName, setTeamName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('');
  const [kitColor, setKitColor] = useState('');
  const [loading, setLoading] = useState(false);
  const { userID } = route.params;

  const validateForm = () => {
    if (teamName.trim() === '' || ageGroup.trim() === '' || proficiencyLevel.trim() === '' || kitColor.trim() === '') {
        Alert.alert('Validation Error', 'All fields are required');
        return false;
        }
        
        return true;
    };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const team = {
      teamName,
      ageGroup,
      proficiencyLevel,
      kitColor,
      coachID: userID,
    };

    axios
      .post(`${IP_ADDRESS}:5000/api/teams`, team)
        .then((response) => {
            setLoading(false);
            if (response.data.status === 'success') {
                Alert.alert('Success', 'Team created successfully');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Something went wrong!');
            }
        })
        .catch((error) => {
            setLoading(false);
            console.error('There was an error!', error);
            Alert.alert('Error', 'Something went wrong! Please try again later.');
        });
    };
        

  return (
    <View style={styles.container}>
      <Text>Team Name:</Text>
      <TextInput style={styles.input} value={teamName} onChangeText={setTeamName} />

      <Text>Age Group:</Text>
      <TextInput style={styles.input} value={ageGroup} onChangeText={setAgeGroup} />

      <Text>Proficiency Level:</Text>
      <TextInput style={styles.input} value={proficiencyLevel} onChangeText={setProficiencyLevel} />

      <Text>Kit Color:</Text>
      <TextInput style={styles.input} value={kitColor} onChangeText={setKitColor} />

      <Button title="Create Team" onPress={handleSubmit} disabled={loading}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
});

export default CreateTeam;

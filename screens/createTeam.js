import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {styles} from '../styles/styles.js'
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';

function CreateTeam({ route, navigation }) {
  const [teamName, setTeamName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState("1");
  const [kitColor, setKitColor] = useState('');
  const [loading, setLoading] = useState(false);
  const { token, userID } = route.params;

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
      .post(`${IP_ADDRESS}/api/teams/createTeam`, team)
        .then((response) => {
            setLoading(false);
            if (response.data.status === 'success') {
                Alert.alert('Success', 'Team created successfully');
                navigation.navigate('Home', {
                screen: 'HomeDrawer',
                params: { token, userID}
                });
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
    <View style={styles.containerCreateTeam}>
      <Text>Team Name:</Text>
      <TextInput style={styles.inputCreateTeam} value={teamName} onChangeText={setTeamName} />

      <Text>Age Group:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={ageGroup}
          onValueChange={(itemValue, itemIndex) => setAgeGroup(itemValue)}>
          <Picker.Item label="Under 6" value="U-6" />
          <Picker.Item label="Under 7" value="U-7" />
          <Picker.Item label="Under 8" value="U-8" />
          <Picker.Item label="Under 9" value="U-9" />
          <Picker.Item label="Under 10" value="U-10" />
          <Picker.Item label="Under 11" value="U-11" />
          <Picker.Item label="Under 12" value="U-12" />
          <Picker.Item label="Under 13" value="U-13" />
          <Picker.Item label="Under 14" value="U-14" />
          <Picker.Item label="Under 15" value="U-15" />
          <Picker.Item label="Under 16" value="U-16" />
          <Picker.Item label="Under 17" value="U-17" />
          <Picker.Item label="Under 18" value="U-18" />
        </Picker>
      </View>
      <Text>Proficiency Level:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={proficiencyLevel}
          onValueChange={(itemValue, itemIndex) =>
            setProficiencyLevel(itemValue)
          }>
          <Picker.Item label="1 - lowest" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5 - highest" value="5" />
        </Picker>
      </View>

      <Text>Kit Colours:</Text>
      <TextInput style={styles.inputCreateTeam} value={kitColor} onChangeText={setKitColor} />

      <Button title="Create Team" onPress={handleSubmit} disabled={loading}/>
    </View>
  );
}

export default CreateTeam;

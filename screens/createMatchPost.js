import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Platform, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/styles.js';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateMatchPost = ({ route, navigation }) => {
  const [pitchName, setPitchName] = useState('');
  const [pitchLocation, setPitchLocation] = useState('');
  const [requiredAgeGroup, setRequiredAgeGroup] = useState('Age Group');
  const [requiredProficiencyLevel, setRequiredProficiencyLevel] = useState('Proficiency Level');
  const [details, setDetails] = useState('');
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isTimePickerShown, setIsTimePickerShown] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [loading, setLoading] = useState(false);

  const { token, userID } = route.params;

  const now = new Date();

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [time, setTime] = useState(now);
  const [date, setDate] = useState(tomorrow);
  
  useEffect(() => {
    axios.get(`${IP_ADDRESS}/api/teams/teamInfo`, { params: { userID: userID } })
        .then(response => setTeams(response.data))
        .catch(error => console.error('There was an error!', error));
}, []);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsPickerShown(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTeamChange = (teamID) => {
    const selectedTeam = teams.find(team => team._id === teamID);
    setSelectedTeam(selectedTeam);
    setRequiredAgeGroup(selectedTeam.age_group);
    setRequiredProficiencyLevel(selectedTeam.proficiency_level);
}

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setIsTimePickerShown(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleCreatePost = () => {
    setLoading(true);
    
    const post = {
        teamID: selectedTeam._id,
        date,
        time,
        pitchName,
        pitchLocation,
        requiredAgeGroup,
        requiredProficiencyLevel,
        details,
        coach_id: userID,
  };

    axios
        .post(`${IP_ADDRESS}/api/matchPost/createPost`, post)
        .then((response) => {
            setLoading(false);
            if (response.data.status === 'success') {
                Alert.alert('Success', 'Post created successfully');
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      >
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.containerCreateTeam}>

          <Text>Team:</Text>
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

          <TextInput 
            style={styles.nonEditableInputDT} 
            value={`Date: ${date.toLocaleDateString()}`} 
            editable={false} 
          />

          <TouchableOpacity style={styles.buttonDateTime} onPress={() => setIsPickerShown(true)}>
            <Text>Change Date</Text>
          </TouchableOpacity>
        
          {isPickerShown && ( 
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="Calendar"
            onChange={onChange}
            minimumDate={now}
          />
          )}

          <TextInput 
            style={styles.nonEditableInputDT} 
            value={`Time: ${time.toLocaleTimeString()}`} 
            editable={false} 
          />

          <TouchableOpacity style={styles.buttonDateTime} onPress={() => setIsTimePickerShown(true)}>
            <Text>Change Time</Text>
          </TouchableOpacity>
        
          {isTimePickerShown && ( 
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={true}
            display="Clock"
            onChange={onChangeTime}
          />
          )}

          <TextInput
            style={styles.inputPitch}
            placeholder="Pitch Name"
            value={pitchName}
            onChangeText={setPitchName}
          />

          <TextInput
            style={styles.inputPitch}
            placeholder="Pitch Location"
            value={pitchLocation}
            onChangeText={setPitchLocation}
            />

          <TextInput
            style={styles.nonEditableInput}
            value={`Age group: ${requiredAgeGroup}`}
            editable={false}
          />

          <TextInput
            style={styles.nonEditableInput}
            value={`Proficiency level: ${requiredProficiencyLevel}`}
            editable={false}
          />

          <TextInput
            style={styles.inputDetails}
            placeholder="Additional Details"
            value={details}
            onChangeText={setDetails}
          />

          <Button style={styles.buttonDateTime} title="Create Match Post" onPress={handleCreatePost} disabled={loading}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateMatchPost;

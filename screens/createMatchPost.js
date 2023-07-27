import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../components/styles.js';
import axios from 'axios';
import { IP_ADDRESS } from '../constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateMatchPost = ({ route, navigation }) => {
  const [pitchName, setPitchName] = useState('');
  const [pitchLocation, setPitchLocation] = useState('');
  const [requiredAgeGroup, setRequiredAgeGroup] = useState('');
  const [requiredProficiencyLevel, setRequiredProficiencyLevel] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [isTimePickerShown, setIsTimePickerShown] = useState(false);
  const { token, userID } = route.params;

  const now = new Date();

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [time, setTime] = useState(now);
  const [date, setDate] = useState(tomorrow);
  

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setIsPickerShown(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setIsTimePickerShown(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleCreatePost = () => {
    setLoading(true);
    
    const post = {
        date,
        time,
        pitchName,
        pitchLocation,
        requiredAgeGroup,
        requiredProficiencyLevel,
        details,
  };

    axios
        .post(`${IP_ADDRESS}:5000/api/matchPost`, post)
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
    <View style={styles.containerCreateTeam}>
      {/* <Text style={styles.title}>Create Match Post</Text> */}

      <TextInput style={styles.input} value={`Date: ${date.toLocaleDateString()}`} editable={false} />
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

      <TextInput style={styles.input} value={`Time: ${time.toLocaleTimeString()}`} editable={false} />
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
        style={styles.input}
        placeholder="Pitch Name"
        value={pitchName}
        onChangeText={setPitchName}
      />

      <TextInput
        style={styles.input}
        placeholder="Pitch Location"
        value={pitchLocation}
        onChangeText={setPitchLocation}
        />

      <TextInput
        style={styles.input}
        placeholder="Required Age Group"
        value={requiredAgeGroup}
        onChangeText={setRequiredAgeGroup}
      />

      <Picker
        selectedValue={requiredProficiencyLevel}
        style={styles.pickerContainer}
        onValueChange={(itemValue) => setRequiredProficiencyLevel(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Additional Details"
        value={details}
        onChangeText={setDetails}
      />

      <Button title="Create Match Post" onPress={handleCreatePost} disabled={loading}/>
    </View>
  );
};

export default CreateMatchPost;

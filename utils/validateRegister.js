import { Alert } from 'react-native';
import { nameRegex, passwordRegex, emailRegex } from '../constants/constants';

//validate for blank fields and validate the format
export const validateForm = (username, password, email, phoneNumber) => {
    if (username.trim() === '' || password.trim() === '' || email.trim() === '' || phoneNumber.trim() === '') {
      Alert.alert('Validation Error', 'All fields are required');
      return false;
    }
    
    if (!nameRegex.test(username.trim())) {
      Alert.alert('Validation Error', 'Please enter your full name');
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }

    if (!passwordRegex.test(password.trim())) {
      Alert.alert('Validation Error', 'Password must be at least 8 characters long and contain at least 1 special character');
      return false;
    }

    if(isNaN(phoneNumber.trim())||phoneNumber.trim().length<10) {
      Alert.alert('Validation Error', 'Please enter a valid phone number');
      return false;
    }

    return true;
  };

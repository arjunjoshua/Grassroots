import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      alignContent: 'center',
    },

    title: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },

    inputPitch: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginTop: 5,
    },

    inputDetails: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 13,
      marginTop: 10,
    },

    nonEditableInput: {        
      fontSize: 14,              
      backgroundColor: '#f3f3f3', 
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      marginBottom: 5,
      borderRadius: 5,
      paddingHorizontal: 10,    
    },

    nonEditableInputDT: {        
      fontSize: 14,              
      backgroundColor: '#f3f3f3', 
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 5,
      borderRadius: 5,
      paddingHorizontal: 10,    
    },

    inputPassword: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 20,
      marginBottom: 5,
      borderRadius: 5,
      paddingHorizontal: 10,
    },

    inputEmail: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 5,
      paddingHorizontal: 10,
    },

    passwordInstruction: {
      fontSize: 12,
      fontStyle: 'italic',
    },

    button: {
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#2196F3',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
    },

    buttonText: {
      color: 'white',
      fontSize: 16,
    },

    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    tokenText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },

    containerCreateTeam: {
        flex: 1,
        padding: 16,
      },

    inputCreateTeam: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
    },

    pickerContainer: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      borederRadius: 5,
      overflow: 'hidden',
      justifyContent: 'center',
    },

    buttonDateTime: {
      marginTop: 10,
      backgroundColor: '#2196F3',
      height: 30,
      width: 175,
      padding: 5,
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 3,
      marginBottom: 15,
    },

    registerText: {
      fontSize: 16,
      color: '#000', 
      marginTop: 17,
      textAlign: 'center',
    },

    hyperlink: {
      color: 'blue', 
      textDecorationLine: 'underline',
    },
  });
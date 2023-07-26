import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },

    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      borderRadius: 5,
      paddingHorizontal: 10,
    },

    button: {
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
    }
  });
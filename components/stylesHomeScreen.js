import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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


    // Notification Modal
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
    notificationTeam: {
      fontSize: 15,
    },
    notificationDate: {
      fontSize: 15,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      flex: 1,
      paddingTop: 50,
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
      elevation: 2,
      borderColor: 'black',
    },
    buttonClose: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: "#2196F3",
      padding: 10,
      borderRadius: 20,
    },
  });
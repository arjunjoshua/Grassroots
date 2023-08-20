import { View, Text } from 'react-native';
import { styles } from '../styles/stylesHomeScreen';

// render each team
export const renderTeam = ({ item }) => (
    <View style={styles.teamContainer}>
      <Text style={styles.team_name}>{item.team_name}</Text>
      <Text style={styles.team_info}>{item.age_group}</Text>
      <Text style={styles.team_info}>Level: {item.proficiency_level}</Text>
    </View>
  );
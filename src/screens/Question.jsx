import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Notification from '../Notification'; 

export default ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  // const { question } = useSelector((state) => state.question);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>The question from your job application will show up here.</Text>
      <Notification />
    </View>
  );
}
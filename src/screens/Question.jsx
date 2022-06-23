import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import useSetupNotification from '../useSetupNotification'; 

export default () => {
  // const user = getUser(useSelector((state) => state.auth));
  // const token = useSetupNotification(user);

  const { question } = useSelector((state) => state.data);

  question && console.log(question);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>The question from your job application will show up here.</Text>
      {/* <Notification /> */}
    </View>
  );
}
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import useGetUser from '../useGetUser';
import useSetupNotification from '../useSetupNotification'; 

export default () => {
  const user = useGetUser();
  // const { question } = useSelector((state) => state.data);

  useSetupNotification(user);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>The question from your job application will show up here.</Text>
    </View>
  );
}
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import Question from '../components/Question';
import useGetUser from '../useGetUser';
import useSetupNotification from '../useSetupNotification'; 

export default () => {
  const user = useGetUser();
  const { question } = useSelector((state) => state.data);
  const [answer, setAnswer] = useState();

  useSetupNotification(user);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!question && <Text>The question from your job application will show up here.</Text>}
      {question && <Question question={question} handleChange={setAnswer} answer={answer} />}
    </View>
  );
}
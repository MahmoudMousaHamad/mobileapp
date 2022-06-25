import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { sendData } from '../actions/data';

import Question from '../components/Question';
import useGetUser from '../useGetUser';
import useSetupNotification from '../useSetupNotification'; 

export default () => {
  const { question } = useSelector((state) => state.data);
  const [answer, setAnswer] = useState();
  const dispatch = useDispatch();
  const user = useGetUser();

  useSetupNotification(user);

  answer && console.log("Answer: ", answer);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!question && <Text>The question from your job application will show up here.</Text>}
      {question && <Question question={question} handleChange={setAnswer} answer={answer} />}
      <Button onPress={dispatch(sendData("answer", answer))}>Submit</Button>
    </View>
  );
}
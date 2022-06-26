import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendData } from '../actions/data';

import useSetupNotification from '../useSetupNotification'; 
import Question from '../components/Question';
import useAppState from '../useAppState';
import useGetUser from '../useGetUser';

export default () => {
  const { question } = useSelector((state) => state.data);
  const { state } = useSelector((state) => state.appState);
  const [answer, setAnswer] = useState();
  const dispatch = useDispatch();
  const user = useGetUser();

  useSetupNotification(user);
  useAppState();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!question && <Text>The question from your job application will show up here.</Text>}
      {question && (
      <>
        <Question question={question} handleChange={setAnswer} answer={answer} />
        <Button onPress={() => dispatch(sendData("answer", answer))}>Submit</Button>
      </> 
      )}
    </View>
  );
}
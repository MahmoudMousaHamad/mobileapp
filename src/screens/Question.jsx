import { Button } from '@ui-kitten/components';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, sendData } from '../actions/data';

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

  const handleSubmit = () => {
    if (question.type === "date") {
      dispatch(sendData("answer", JSON.stringify(answer).slice(1, 11)));
    } else {
      dispatch(sendData("answer", answer));
    }
    setAnswer();
    dispatch(clearData("question"));
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
      {!question && <Text>The question from your job application will show up here.</Text>}
      {question && (
      <>
        <Question question={question} handleChange={setAnswer} answer={answer} />
        <Button onPress={handleSubmit}>Submit</Button>
      </> 
      )}
    </View>
  );
}
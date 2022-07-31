import { Button, Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { clearData, sendData } from '../actions/data';

import useSetupNotification from '../useSetupNotification'; 
import Question from '../components/Question';
import useAppState from '../useAppState';
import Socket from '../Socket';
import config from '../config';

export default () => {
  const { question } = useSelector((state) => state.data);
  const [answer, setAnswer] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    if (!Socket.isConnected) {
      Socket.connect(config.SERVER_ENDPOINT, store);
    }
  });

  useSetupNotification();
  useAppState();

  const handleSubmit = () => {
    if (!answer && answer !== 0) {
      setError("Please answer the question");
      return;
    }

    if (error) {
      setError();
    }

    if (question.type === "date") {
      dispatch(sendData("answer", JSON.stringify(answer).slice(1, 11)));
    } else {
      dispatch(sendData("answer", answer));
    }
    setAnswer();
    dispatch(clearData("question"));
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
      {!question && <Text>If a questoin needs your attention, it will show up here</Text>}
      {question && (
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <Question  question={question} handleChange={setAnswer} answer={answer} handleSubmit={handleSubmit} />
        <Button style={{ marginBottom: 10 }} onPress={handleSubmit}>Submit</Button>
        {error && 
          <Layout>
            <Text style={{color: "red"}}>{error}</Text>
          </Layout>
        }
      </ScrollView> 
      )}
    </View>
  );
}
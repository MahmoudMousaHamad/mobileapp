import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { setPushToken } from './actions/auth';
import { gotData } from './actions/data';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function useSetupNotification(user) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  // const user = getUser(useSelector(state => state.auth));
  const notificationListener = useRef();
  // const responseListener = useRef();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (expoPushToken && user) {
  //     console.log("User: ", user);
  //     dispatch(setPushToken(user.id, expoPushToken))
  //       .then(() => {
  //         console.log("Push token set successfully.");
  //       })
  //       .catch(e => {
  //         console.log("Push token set failed.");
  //       });
  //   }
  // }, [expoPushToken]);
  

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      dispatch(setPushToken(user.id, token))
        .then(() => {
          console.log("Push token set successfully.");
        })
        .catch(e => {
          console.log("Push token set failed.");
        });
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const { data, name } = notification.request.content;
      dispatch(gotData(data, name));
    });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return expoPushToken;

  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       alignItems: 'center',
  //       justifyContent: 'space-around',
  //     }}
  //   >
  //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Title: {notification && notification.request.content.title} </Text>
  //       <Text>Body: {notification && notification.request.content.body}</Text>
  //       <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
  //     </View>
  //   </View>
  // );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

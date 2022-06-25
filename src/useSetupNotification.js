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
  const notificationListener = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
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
        const token = (await Notifications.getExpoPushTokenAsync()).data;

        dispatch(setPushToken(user.id, token))
          .then(() => {
            console.log("Push token set successfully.");
          })
          .catch(e => {
            console.log("Push token set failed.");
          });
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
    }
    
    user && registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      const { data: { name } } = notification.request.content;
      const { data: { [name]: data } } =  notification.request.content;
      console.log("Name: ", name);
      console.log("Data: ", data);
      dispatch(gotData(data, name));
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, [user]);
}

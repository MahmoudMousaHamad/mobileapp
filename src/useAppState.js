import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch, useStore } from 'react-redux';

import { appStateChanged } from './actions/appState';
import config from './config';
import Socket from "./Socket";

export default () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  const handleAppStateChange = nextAppState => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground.');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);

    if (appState.current === "background") {
      if (Socket.isConnected) {
        Socket.disconnect();
      }
    } else if (appState.current === "active") {
      if (!Socket.isConnected) {
        Socket.connect(config.SERVER_ENDPOINT, store);
      }
    }

    dispatch(appStateChanged(appState.current));
  };
};

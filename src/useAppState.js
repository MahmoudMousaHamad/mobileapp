import { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { appStateChanged } from './actions/appState';

export default () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, [handleAppStateChange]);

  const handleAppStateChange = nextAppState => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);

    dispatch(appStateChanged(appState.current));
  };
};

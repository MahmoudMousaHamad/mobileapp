import { Provider } from 'react-redux';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import MyApp from './src/index';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <MyApp />
      </ApplicationProvider>
    </Provider>
  );
}
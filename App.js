import { Provider } from 'react-redux';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import App from './src/index';
import store from './src/store';

export default () => {

  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <App />
      </ApplicationProvider>
    </Provider>
  );
}
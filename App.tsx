import { StatusBar } from 'expo-status-bar';

import Routes from './src/Routes';
import { ConfigAppContextProvider } from './src/contexts/ConfigAppContext';

export default function App() {
  return (
    <>
      <ConfigAppContextProvider>
        <StatusBar style="inverted" />
        <Routes />
      </ConfigAppContextProvider>
    </>
  );
}
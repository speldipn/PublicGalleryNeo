import React from 'react';
import {Text} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Public Gallery Neo</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

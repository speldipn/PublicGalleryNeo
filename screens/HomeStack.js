import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Feed" component={FeedScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroScreen from './IntroScreen';
import StoragePermissionScreen from './StoragePermissionScreen';
import UserPreferencesScreen from './UserPreferencesScreen';

const Stack = createNativeStackNavigator();

const IntroNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="intro"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="intro" component={IntroScreen} />
      <Stack.Screen name="permission" component={StoragePermissionScreen} />
      <Stack.Screen name="preferences" component={UserPreferencesScreen} />
    </Stack.Navigator>
  );
};

export default IntroNavigator;

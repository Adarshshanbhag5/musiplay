import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from './settings/Settings';
import Theme from './settings/Theme';

const Stack = createNativeStackNavigator();

const AppSettingsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="settings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Settings} name="settings" />
      <Stack.Screen component={Theme} name="theme" />
    </Stack.Navigator>
  );
};

export default AppSettingsNavigator;

const styles = StyleSheet.create({});

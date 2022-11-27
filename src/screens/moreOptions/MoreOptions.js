import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HelpInfo from './HelpInfo';
import SleepTimer from './SleepTimer';
import MoreOptionsInner from './MoreOptionsInner';
import AppSettingsNavigator from './AppSettingsNavigator';

const Stack = createNativeStackNavigator();

const MoreOptions = () => {
  return (
    <Stack.Navigator initialRouteName="more">
      <Stack.Screen name="more" component={MoreOptionsInner} />
      <Stack.Screen name="Appsettings" component={AppSettingsNavigator} />
      <Stack.Screen name="Help_and_info" component={HelpInfo} />
      <Stack.Screen name="sleep_timer" component={SleepTimer} />
    </Stack.Navigator>
  );
};

export default MoreOptions;

const styles = StyleSheet.create({});

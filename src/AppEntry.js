import React, {useContext} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import IntroNavigator from './appIntro/IntroNavigator';
import {StoragePermissionContext} from './context/StoragePermissionContext';
import useGetOnboardingStatus from './hooks/useGetOnboardingStatus';
import StoragePermissionScreen from './appIntro/StoragePermissionScreen';
import {ActivityIndicator, View} from 'react-native';
import RootStackScreen from './screens/RootStackScreen';

const AppEntry = () => {
  const {permissionGranted, permissionLoading} = useContext(
    StoragePermissionContext,
  );
  const {isFirstLaunch, isFirstLaunchLoading} = useGetOnboardingStatus();

  if (isFirstLaunchLoading || permissionLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  } else if (permissionGranted === false && isFirstLaunch === true) {
    return (
      <NavigationContainer theme={DarkTheme}>
        <IntroNavigator />
      </NavigationContainer>
    );
  } else if (isFirstLaunch === false && permissionGranted === false) {
    return (
      <View style={{flex: 1}}>
        <StoragePermissionScreen withIntro={false} />
      </View>
    );
  } else {
    return <RootStackScreen />;
  }
};

export default AppEntry;

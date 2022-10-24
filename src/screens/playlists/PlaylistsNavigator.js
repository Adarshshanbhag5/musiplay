import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Playlists from './Playlists';
import AllSongs from './AllSongs';

const Stack = createNativeStackNavigator();

const PlaylistsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="playlists">
      <Stack.Screen
        name="playlists"
        component={Playlists}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AllSongs"
        component={AllSongs}
        options={{headerTitle: 'All songs'}}
      />
    </Stack.Navigator>
  );
};

export default PlaylistsNavigator;

const styles = StyleSheet.create({});

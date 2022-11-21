import React from 'react';
import {FileSystemProvider} from '../hooks/useFileSystem';
import {PlaylistProvider} from '../hooks/usePlaylistContext';
import MusicPlay from '../MusicPlay';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import InputModal from './modalScreen/InputModal';
import PlaylistLongPressModal from './modalScreen/PlaylistLongPressModal';
import OptionModal from './modalScreen/OptionModal';
import AddPlaylistModal from './modalScreen/AddPlaylistModal';
const RootStack = createNativeStackNavigator();
const RootStackScreen = () => {
  return (
    <FileSystemProvider>
      <PlaylistProvider>
        <NavigationContainer theme={DarkTheme}>
          <RootStack.Navigator
            initialRouteName="musiplay"
            screenOptions={{headerShown: false}}>
            <RootStack.Group>
              <RootStack.Screen name="musiplay" component={MusicPlay} />
            </RootStack.Group>
            <RootStack.Group
              screenOptions={{
                presentation: 'transparentModal',
                headerShown: false,
              }}>
              <RootStack.Screen name="input-text" component={InputModal} />
              <RootStack.Screen
                name="playlistlongpress"
                component={PlaylistLongPressModal}
              />
              <RootStack.Screen name="option-modal" component={OptionModal} />
              <RootStack.Screen
                name="addPlaylist-modal"
                component={AddPlaylistModal}
              />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </PlaylistProvider>
    </FileSystemProvider>
  );
};

export default RootStackScreen;

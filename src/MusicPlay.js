import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Search from './screens/Search';
import Queues from './screens/Queues';
import NowPlaying from './screens/NowPlaying';
import MoreOptions from './screens/moreOptions/MoreOptions';
import FoldersNavigator from './screens/foldres/FoldersNavigator';
import PlaylistsNavigator from './screens/playlists/PlaylistsNavigator';
import SetupService from './services/SetupService';
import TrackPlayer from 'react-native-track-player';
import {ActivityIndicator, Text, View} from 'react-native';
import InitialQueueService from './services/InitialqueueService';
import {useFileSystem} from './hooks/useFileSystem';

const Tab = createMaterialTopTabNavigator();

const MusicPlay = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const {dataLoading, getAllSongs} = useFileSystem();
  useEffect(() => {
    async function setUpPlayer() {
      try {
        const isSetup = await SetupService();
        setIsPlayerReady(isSetup);
        // const Queue = await TrackPlayer.getQueue();
        // await getAllSongs();
        const response = await Promise.all([
          TrackPlayer.getQueue(),
          getAllSongs(),
        ]);
        if (isSetup && response[0].length <= 0) {
          await InitialQueueService();
        }
      } catch (err) {
        console.log(err);
      }
    }
    setUpPlayer();
  }, []);

  if (!isPlayerReady || dataLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
        <Text style={{marginVertical: 10, color: '#fff', fontSize: 16}}>
          Loading...
        </Text>
      </View>
    );
  } else {
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName="NowPlaying"
            screenOptions={{
              tabBarStyle: {backgroundColor: '#111'},
              tabBarIndicatorStyle: {backgroundColor: '#7cfc00'},
              tabBarShowLabel: false,
            }}>
            <Tab.Screen
              name="Queue"
              component={Queues}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="queue-music" color={color} size={26} />
                ),
                lazy: true,
                lazyPlaceholder: () => <ActivityIndicator />,
              }}
            />
            <Tab.Screen
              name="NowPlaying"
              component={NowPlaying}
              options={{
                tabBarStyle: {backgroundColor: 'rgba(0,0,0,0)'},
                tabBarIcon: ({color}) => (
                  <MaterialIcons
                    name="play-circle-fill"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="FoldersNavigator"
              component={FoldersNavigator}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="folder" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="search" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="PlaylistsNavigator"
              component={PlaylistsNavigator}
              options={{
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="library-music" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="moreOptions"
              component={MoreOptions}
              options={{
                swipeEnabled: false,
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="more" color={color} size={24} />
                ),
              }}
            />
          </Tab.Navigator>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
};

export default MusicPlay;

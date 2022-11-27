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
import {ActivityIndicator, View} from 'react-native';
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
        const Queue = await TrackPlayer.getQueue();
        if (isSetup && Queue.length <= 0) {
          console.log('inside initialQueueServices');
          // await InitialQueueService();
          await Promise.all([getAllSongs(), InitialQueueService()]);
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
        <ActivityIndicator />
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
            }}>
            <Tab.Screen
              name="Queue"
              component={Queues}
              options={{
                tabBarShowLabel: false,
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
                tabBarStyle: {backgroundColor: 'transparent'},
                tabBarShowLabel: false,
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
                tabBarShowLabel: false,
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="folder" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({color}) => (
                  <MaterialIcons name="search" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="PlaylistsNavigator"
              component={PlaylistsNavigator}
              options={{
                tabBarShowLabel: false,
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
                tabBarShowLabel: false,
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

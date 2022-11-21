import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useFileSystem} from '../../hooks/useFileSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';

const UserPlaylist = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [playlistData, setPlaylistData] = useState([]);
  const {data} = useFileSystem();
  async function getPlaylistData() {
    try {
      setLoading(true);
      const jsonValue = await AsyncStorage.getItem(route.params.data.key);
      const playlist = JSON.parse(jsonValue);
      const songs = data.filter(val => playlist.includes(val.id));
      setPlaylistData(songs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handlePress(startIndex) {
    let track = playlistData;
    // .map(item => ({
    //   id: item.id,
    //   url: `file://${item.path}`,
    //   duration: Math.floor(parseInt(item.duration, 10) / 1000),
    //   title: item.title,
    //   album: item.album,
    //   artist: item.artist,
    //   artwork: item.cover,
    // }));
    // await TrackPlayer.reset();
    // await InitialQueueService(track);
    // await TrackPlayer.skip(startIndex);
    console.log(startIndex);
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }
  useEffect(() => {
    getPlaylistData();
  }, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <SongListView
        data={item}
        onPress={() => {
          handlePress(index);
        }}
      />
    ),
    [handlePress],
  );
  return (
    <View style={{flex: 1}}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.innerContainer}>
            <Text
              style={
                styles.inner__container__text
              }>{`${playlistData.length} songs`}</Text>
            <Text style={styles.inner__container__text}>1:38:15</Text>
          </View>
          {playlistData && (
            <FlatList
              data={playlistData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          )}
        </>
      )}
      {/* <OptionsModal
        modal={state.modalOpen}
        data={state.optionData}
        modalCase={state.modalCase}
      /> */}
    </View>
  );
};

export default UserPlaylist;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
    paddingHorizontal: 12,
    marginVertical: 18,
  },
  listContainer: {
    marginTop: 20,
  },
  inner__container__text: {
    marginRight: 10,
    fontSize: 16,
  },
});

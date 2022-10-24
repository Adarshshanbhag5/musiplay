import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SongListView from '../../components/SongListView';
import {useFileSystem} from '../../hooks/useFileSystem';
import InitialQueueService from '../../services/InitialqueueService';
import TrackPlayer from 'react-native-track-player';
import AddQueueService from '../../services/AddQueueService';

const AllSongs = ({navigation}) => {
  const {data} = useFileSystem();
  async function handlePress(startIndex) {
    let track = data.map(item => ({
      id: item.id,
      url: `file://${item.path}`,
      duration: Math.floor(parseInt(item.duration, 10) / 1000),
      title: item.title,
      album: item.album,
      artist: item.artist,
      artwork: item.cover,
    }));
    // await TrackPlayer.reset();
    // await InitialQueueService(track);
    // await TrackPlayer.skip(startIndex);
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }
  return (
    <View style={{flex: 1}}>
      <View style={styles.innerContainer}>
        <Text
          style={styles.inner__container__text}>{`${data.length} songs`}</Text>
        <Text style={styles.inner__container__text}>1:38:15</Text>
      </View>
      {data && (
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item, index}) => (
            <SongListView
              album={item.album}
              artist={item.artist}
              title={item.title}
              cover={item.cover}
              duration={item.duration}
              filePath={item.path}
              onPress={() => {
                handlePress(index);
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default AllSongs;

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

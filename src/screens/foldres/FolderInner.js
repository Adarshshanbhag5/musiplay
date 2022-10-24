import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FolderListView from '../../components/FolderListView';
import SongListView from '../../components/SongListView';
// import InitialQueueService from '../../services/InitialqueueService';
// import {useTrackContext} from '../../hooks/useTrackContext';
import AddQueueService from '../../services/AddQueueService';

const FolderInner = ({route, navigation}) => {
  // const {queueInitalTrackService} = useTrackContext();
  async function handlePress(startIndex) {
    let track = route.params.data[0].files.map(item => ({
      id: item.id,
      url: `file://${item.path}`,
      duration: Math.floor(parseInt(item.duration, 10) / 1000),
      title: item.title,
      album: item.album,
      artist: item.artist,
      artwork: item.cover,
    }));
    //await queueInitalTrackService(track);
    AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.header__container}>
        <Text style={styles.path__text}>path</Text>
        <View style={styles.details__container}>
          <Text
            style={{
              marginRight: 10,
            }}>{`${route.params.data[0].totalFiles} songs`}</Text>
          <Text
            style={{
              marginRight: 10,
            }}>{`${route.params.data[0].totalDuration}`}</Text>
        </View>
      </View>
      {
        <FlatList
          data={route.params.data}
          renderItem={({item, index}) =>
            item.folderHierarchy.length === route.params.hierarchyCount ? (
              item.files.map(val => (
                <SongListView
                  album={val.album}
                  artist={val.artist}
                  title={val.title}
                  cover={val.cover}
                  duration={val.duration}
                  filePath={val.path}
                  key={val.id}
                  onPress={() => {
                    handlePress(index);
                  }}
                />
              ))
            ) : (
              <FolderListView
                name={item.folderHierarchy[route.params.hierarchyCount]}
                onPress={() => {
                  navigation.push('Music', {
                    data: [item],
                    hierarchyCount: route.params.hierarchyCount + 1,
                  });
                }}
              />
            )
          }
          keyExtractor={(_, index) => index.toString()}
        />
      }
    </View>
  );
};

export default FolderInner;

const styles = StyleSheet.create({
  header__container: {
    paddingHorizontal: 12,
    marginVertical: 18,
  },

  details__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
  },
  path__text: {
    marginBottom: 10,
  },
});

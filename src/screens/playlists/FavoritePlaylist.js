import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useFileSystem} from '../../hooks/useFileSystem';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';
import convertMsToTime from '../../utils/DurationFromater';

const FavoritePlaylist = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [favoriteData, setFavoriteData] = useState([]);
  const {data} = useFileSystem();
  const {favoriteList} = usePlaylistContext();
  function getFavoriteData() {
    try {
      setLoading(true);
      const songs = data.filter(val => favoriteList.includes(val.id));
      setFavoriteData(songs);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (favoriteList) {
      getFavoriteData();
    }
  }, [favoriteList]);

  async function handlePress(startIndex) {
    let track = favoriteData;
    console.log(startIndex);
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }

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
              }>{`${favoriteData.length} songs`}</Text>
            <Text style={styles.inner__container__text}>
              {favoriteData.length > 0
                ? convertMsToTime(
                    favoriteData.reduce(
                      (total, val) => val.duration + total,
                      0,
                    ),
                  )
                : '00:00:00'}
            </Text>
          </View>
          {favoriteData.length > 0 ? (
            <FlatList
              data={favoriteData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text style={styles.empty__text}>Oops! favorite list is empty</Text>
          )}
        </>
      )}
    </View>
  );
};

export default FavoritePlaylist;

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
  empty__text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#fff',
  },
});

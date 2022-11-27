import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import SongListView from '../../components/SongListView';
import {useFileSystem} from '../../hooks/useFileSystem';
import AddQueueService from '../../services/AddQueueService';

const AllSongs = ({navigation}) => {
  const {data} = useFileSystem();
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
  async function handlePress(startIndex) {
    await AddQueueService(data, startIndex);
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
          renderItem={renderItem}
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

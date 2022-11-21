import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useFileSystem} from '../hooks/useFileSystem';
import SongListView from '../components/SongListView';
import AddQueueService from '../services/AddQueueService';

const Search = ({navigation}) => {
  const {data} = useFileSystem();
  const [input, setInput] = useState('');
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
  const DATA = useMemo(() => {
    return data.filter(val => {
      if (input === '') {
        return null;
      } else if (
        val.title.toLowerCase().includes(input.toLowerCase()) ||
        val.artist.toLowerCase().includes(input.toLowerCase())
      ) {
        return val;
      }
    });
  }, [input]);
  async function handlePress(startIndex) {
    console.log(startIndex);
    await AddQueueService(DATA, startIndex);
    navigation.navigate('NowPlaying');
  }
  return (
    <View style={styles.container}>
      <View style={styles.search__box__container}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search by title,album,artist"
          value={input}
          onChangeText={setInput}
        />
      </View>
      {data && (
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search__box__container: {
    marginBottom: 20,
    alignItems: 'center',
  },
  searchBox: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 16,
    position: 'relative',
    color: '#fff',
    marginTop: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
  },
});

import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useFileSystem} from '../hooks/useFileSystem';
import SongListView from '../components/SongListView';

const Search = () => {
  const {data} = useFileSystem();
  const [input, setInput] = useState('');
  function inputHandler(e) {
    setInput(e.target.value);
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
          data={data.filter(val => {
            if (input === '') {
              return null;
            } else if (
              val.title.toLowerCase().includes(input.toLowerCase()) ||
              val.artist.toLowerCase().includes(input.toLowerCase())
            ) {
              return val;
            }
          })}
          renderItem={({item}) => (
            <SongListView
              album={item.album}
              artist={item.artist}
              title={item.title}
              cover={item.cover}
              duration={item.duration}
              filePath={item.path}
            />
          )}
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

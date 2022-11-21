import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import GlobalStyle from '../../utils/GlobalStyle';
import Touch from '../../utils/Touch';
import PlaylistView from '../../components/PlaylistView';
import globalStyle from '../../utils/GlobalStyle';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';

const Playlists = ({navigation}) => {
  const {playlist} = usePlaylistContext();

  function createNewPlaylist() {
    navigation.navigate('input-text');
  }

  function playlistLongPress(data, index) {
    navigation.navigate('playlistlongpress', {data: {...data, index}});
  }

  return (
    <View>
      <Touch
        onPress={() => {
          navigation.navigate('AllSongs');
        }}>
        <View style={[GlobalStyle.flex__row__start, styles.list__container]}>
          <MaterialCommunityIcons
            name="folder-music"
            color={'#fff'}
            size={32}
          />
          <Text style={styles.list__container__text}>All songs</Text>
        </View>
      </Touch>
      <Touch>
        <View style={[GlobalStyle.flex__row__start, styles.list__container]}>
          <MaterialIcons name="favorite" color={'#fff'} size={32} />
          <Text style={styles.list__container__text}>Favorites</Text>
        </View>
      </Touch>
      <Touch>
        <View style={[GlobalStyle.flex__row__start, styles.list__container]}>
          <MaterialIcons name="whatshot" color={'#fff'} size={32} />
          <Text style={styles.list__container__text}>Most Played</Text>
        </View>
      </Touch>
      <Touch>
        <View style={[GlobalStyle.flex__row__start, styles.list__container]}>
          <MaterialIcons name="not-interested" color={'#fff'} size={32} />
          <Text style={styles.list__container__text}>Not Played</Text>
        </View>
      </Touch>
      <View style={styles.playlist__container}>
        <Text style={styles.playlist__text}>Your Playlists</Text>
        {/* <PlaylistView />
        <PlaylistView /> */}
        {playlist &&
          playlist.map((item, index) => (
            <PlaylistView
              name={item.name}
              key={item.key}
              onPress={() => {
                navigation.navigate('userPlaylist', {data: item});
              }}
              onLongPress={() => {
                playlistLongPress(item, index);
              }}
            />
          ))}
        <TouchableOpacity onPress={createNewPlaylist}>
          <View
            style={[globalStyle.flex__row__space, styles.add__playlist__btn]}>
            <MaterialIcons
              name="playlist-add"
              color={'#3AB0FF'}
              size={26}
              style={{fontWeight: 'bold'}}
            />
            <Text style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
              Add playlist
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Playlists;

const styles = StyleSheet.create({
  list__container: {
    marginVertical: 15,
    marginHorizontal: 25,
  },
  list__container__text: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
  },
  playlist__container: {
    marginTop: 20,
  },
  playlist__text: {
    color: '#3AB0FF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 12,
  },
  add__playlist__btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555',
    maxWidth: '35%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 20,
    marginTop: 25,
  },
});

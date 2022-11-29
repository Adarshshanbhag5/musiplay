import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../../utils/StorageKeys';
import ModalWrap from '../../components/ModalWrap';
import OptionsView from '../../components/OptionsView';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';

const PlaylistLongPressModal = ({route, navigation}) => {
  const {setPlaylist} = usePlaylistContext();
  async function removePlaylistHandler() {
    try {
      await AsyncStorage.removeItem(route.params.data.key);
      const res = await AsyncStorage.getItem(storageKeys.PLAYLIST_LIST);
      const playlist_list = JSON.parse(res);
      playlist_list.splice(route.params.data.index, 1);
      await AsyncStorage.setItem(
        storageKeys.PLAYLIST_LIST,
        JSON.stringify(playlist_list),
      );
      setPlaylist(playlist_list);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      navigation.goBack();
    }
  }

  return (
    <ModalWrap navigation={navigation}>
      <View style={styles.header__container}>
        <Text style={styles.header__text}>{route.params.data.name}</Text>
      </View>
      <View
        style={{
          ...styles.modal__inner__container,
          borderBottomWidth: 1,
          borderColor: '#555',
        }}>
        <OptionsView
          text="Rename playlist"
          icon="edit"
          onPress={() => {
            navigation.replace('input-text', {
              type: 'renamePlaylist',
              playlistIndex: route.params.data.index,
            });
          }}
        />
        <OptionsView
          text="Remove playlist"
          icon="remove-circle-outline"
          onPress={removePlaylistHandler}
        />
      </View>
      <View style={styles.modal__inner__container}>
        <OptionsView text="Play" icon="play-arrow" />
        <OptionsView text="Add to a queue" icon="queue-music" />
      </View>
    </ModalWrap>
  );
};

export default PlaylistLongPressModal;

const styles = StyleSheet.create({
  modal__inner__container: {
    marginTop: 10,
  },
  header__container: {
    marginHorizontal: 20,
  },
  header__text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

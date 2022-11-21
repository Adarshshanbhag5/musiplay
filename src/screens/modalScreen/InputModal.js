import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Touch from '../../utils/Touch';
import globalStyle from '../../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageKeys from '../../utils/StorageKeys';
import GenerateUniqueId from '../../utils/GenerateUniqueId';
import ModalWrap from '../../components/ModalWrap';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';

export default function InputModal({navigation}) {
  const {setPlaylist} = usePlaylistContext();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  async function createPlaylist(playlist) {
    try {
      setLoading(true);
      const playlistJson = await AsyncStorage.getItem(
        storageKeys.PLAYLIST_LIST,
      );
      if (playlistJson != null) {
        const playlist_array = JSON.parse(playlistJson);
        playlist_array.push(playlist);
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      } else {
        const playlist_array = [];
        playlist_array.push(playlist);
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  function okPressHandler() {
    if (input != '') {
      const playlistObj = {
        name: input,
        key: GenerateUniqueId(),
      };
      createPlaylist(playlistObj)
        .then(() => {
          console.log('done');
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
          navigation.goBack();
        });
    } else {
      console.log('oops!');
      AsyncStorage.getItem(storageKeys.PLAYLIST_LIST).then(res => {
        console.log(res);
      });
    }
  }
  return (
    <ModalWrap navigation={navigation}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.inputModal__wrap}>
          <View>
            <Text style={styles.header__text}>Name of playlist</Text>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Name of playlist"
              style={styles.textInput}
            />
          </View>
          <View style={[globalStyle.flex__row__end, styles.control__container]}>
            <Touch
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.control__btn}>
              <Text style={styles.text}>Cancel</Text>
            </Touch>
            <Touch style={styles.control__btn} onPress={okPressHandler}>
              <Text style={styles.text}>Ok</Text>
            </Touch>
          </View>
        </View>
      )}
    </ModalWrap>
  );
}

const styles = StyleSheet.create({
  inputModal__wrap: {
    paddingHorizontal: 15,
  },
  header__text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomColor: '#B4E197',
    borderBottomWidth: 2,
    padding: 5,
    marginVertical: 15,
    color: '#B4E197',
  },
  text: {
    color: '#B4E197',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  control__container: {
    marginTop: 10,
  },
  control__btn: {
    marginHorizontal: 15,
  },
});

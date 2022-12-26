import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import storageKeys from '../utils/StorageKeys';

const PlaylistContext = createContext();
export const usePlaylistContext = () => useContext(PlaylistContext);
export const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  async function getPlaylist() {
    const res = await Promise.all([
      AsyncStorage.getItem(storageKeys.PLAYLIST_LIST),
      AsyncStorage.getItem(storageKeys.FAVORITE_KEY),
    ]);
    setPlaylist(JSON.parse(res[0]));
    setFavoriteList(JSON.parse(res[1]));
  }

  useEffect(() => {
    getPlaylist();
  }, []);
  const createPlaylist = async playlistObj => {
    try {
      const playlistJson = await AsyncStorage.getItem(
        storageKeys.PLAYLIST_LIST,
      );
      if (playlistJson != null) {
        const playlist_array = JSON.parse(playlistJson);
        playlist_array.push(playlistObj);
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      } else {
        const playlist_array = [];
        playlist_array.push(playlistObj);
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const renamePlaylist = async (index, input) => {
    try {
      const playlistJson = await AsyncStorage.getItem(
        storageKeys.PLAYLIST_LIST,
      );
      if (playlistJson != null) {
        const playlist_array = JSON.parse(playlistJson);
        playlist_array[index].name = input;
        await AsyncStorage.setItem(
          storageKeys.PLAYLIST_LIST,
          JSON.stringify(playlist_array),
        );
        setPlaylist(playlist_array);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setFavoriteSong = async songId => {
    try {
      const favoriteJson = await AsyncStorage.getItem(storageKeys.FAVORITE_KEY);
      if (favoriteJson != null) {
        const favorite_array = JSON.parse(favoriteJson);
        let sondIndex = favorite_array.indexOf(songId);
        if (sondIndex > -1) {
          favorite_array.splice(sondIndex, 1);
        } else {
          favorite_array.push(songId);
        }
        await AsyncStorage.setItem(
          storageKeys.FAVORITE_KEY,
          JSON.stringify(favorite_array),
        );
        setFavoriteList(favorite_array);
      } else {
        let favorite_array = [];
        favorite_array.push(songId);
        await AsyncStorage.setItem(
          storageKeys.FAVORITE_KEY,
          JSON.stringify(favorite_array),
        );
        setFavoriteList(favorite_array);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const value = {
    favoriteList,
    playlist,
    setPlaylist,
    createPlaylist,
    renamePlaylist,
    setFavoriteSong,
  };
  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

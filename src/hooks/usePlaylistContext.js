import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import storageKeys from '../utils/StorageKeys';

const PlaylistContext = createContext();
export const usePlaylistContext = () => useContext(PlaylistContext);
export const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  // const [loading, setLoading] = useState(false);
  async function getPlaylist() {
    const res = await AsyncStorage.getItem(storageKeys.PLAYLIST_LIST);
    setPlaylist(JSON.parse(res));
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
  const value = {playlist, setPlaylist, createPlaylist};
  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

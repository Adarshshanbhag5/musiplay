import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';
import storageKeys from '../utils/StorageKeys';

const PlaylistContext = createContext();
export const usePlaylistContext = () => useContext(PlaylistContext);
export const PlaylistProvider = ({children}) => {
  const [playlist, setPlaylist] = useState([]);
  async function getPlaylist() {
    const res = await AsyncStorage.getItem(storageKeys.PLAYLIST_LIST);
    setPlaylist(JSON.parse(res));
  }
  useEffect(() => {
    getPlaylist();
  }, []);
  const value = {playlist, setPlaylist};
  return (
    <PlaylistContext.Provider value={value}>
      {children}
    </PlaylistContext.Provider>
  );
};

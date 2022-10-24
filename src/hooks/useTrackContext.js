import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
// import {useFileSystem} from '../hooks/useFileSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

const TrackContext = createContext();
export const useTrackContext = () => useContext(TrackContext);

const STORAGEKEY = {
  INITIAL_QUEUE: 'initialQueue',
};

// const ACTIONS = {};

// function reducer(state, {type, payload}) {
//   switch (type) {
//     default:
//       return state;
//   }
// }

export function TrackProvider({children}) {
  // const {data} = useFileSystem();
  // const [state, dispatch] = useReducer(reducer, {
  //   queueName: '',
  //   key: '1',
  //   queue: [{}],
  // });
  const [queue, setQueue] = useState([]);
  const [dbUploading, setDbUploading] = useState(false);
  async function uploadStorage(value) {
    try {
      setDbUploading(true);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGEKEY.INITIAL_QUEUE, jsonValue);
      setDbUploading(false);
    } catch (err) {
      console.log(err);
    }
  }

  // async function getCurrentQueue() {
  //   try {
  //     const res = await TrackPlayer.getQueue();
  //     setQueue(res);
  //     console.log(queue);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function queueInitalTrackService(queue) {
    try {
      if (queue) {
        await TrackPlayer.add(queue);
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        const res = await TrackPlayer.getQueue();
        setQueue(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const value = {queue, setQueue, queueInitalTrackService};
  return (
    <TrackContext.Provider value={value}>{children}</TrackContext.Provider>
  );
}

import React, {createContext, useContext, useEffect, useState} from 'react';
import {NativeModules, Platform} from 'react-native';
import RNFS from 'react-native-fs';
const FileSystemContext = createContext();
export const useFileSystem = () => useContext(FileSystemContext);
const {RNGetAudioFiles} = NativeModules;
export function FileSystemProvider({children}) {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [fsData, setFsData] = useState([]);
  useEffect(() => {
    async function getAllSongs() {
      try {
        const res = await getSongs();
        setData(res);
      } catch (err) {
        console.log(err);
      } finally {
        setDataLoading(false);
      }
    }
    getAllSongs();
  }, []);

  useEffect(() => {
    if (data) {
      setFs();
    }
  }, [data]);

  async function readdir(path) {
    try {
      const res = await RNFS.readDir(path);
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      console.log('done');
    }
  }

  function getSongs(options = {}) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        RNGetAudioFiles.getSong(
          options,
          albums => {
            resolve(albums);
          },
          error => {
            reject(error);
          },
        );
      }
    });
  }

  async function setFs() {
    if (data) {
      const rootPath = RNFS.ExternalStorageDirectoryPath;
      let result = [
        ...new Set(data.map(item => item.path.match(/(.*)[\/\\]/)[1] || '')),
      ];
      let arr = [];
      result.forEach(item => {
        let totalFiles = data.filter(
          val => item === val.path.match(/(.*)[\/\\]/)[1] || '',
        );
        let totalDuration = totalFiles.reduce(
          (total, val) => parseInt(val.duration, '10') + total,
          0,
        );
        let folderHierarchy = item.split(`${rootPath}/`).pop().split('/');
        arr = [
          ...arr,
          {
            path: item,
            files: totalFiles,
            totalFiles: totalFiles.length,
            folderHierarchy,
            totalDuration,
          },
        ];
      });
      setFsData(arr);
    }
  }

  const value = {readdir, data, dataLoading, fsData};
  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
}
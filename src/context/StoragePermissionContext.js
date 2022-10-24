import React, {createContext, useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';

export const StoragePermissionContext = createContext();

export function StoragePermissionProvider(props) {
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  async function getPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        // console.log('You can use the storage');
        setPermissionGranted(true);
        setPermissionLoading(false);
      } else {
        // console.log('storage permission denied');
        setPermissionGranted(false);
        setPermissionLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function checkPermission() {
    try {
      const granted = await Promise.all([
        PermissionsAndroid.check('android.permission.READ_EXTERNAL_STORAGE'),
        PermissionsAndroid.check('android.permission.WRITE_EXTERNAL_STORAGE'),
      ]);
      if (granted[0] && granted[1]) {
        setPermissionGranted(true);
        setPermissionLoading(false);
      } else {
        setPermissionGranted(false);
        setPermissionLoading(false);
      }
      // console.log(granted);
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    permissionGranted,
    permissionLoading,
    getPermission,
  };
  return (
    <StoragePermissionContext.Provider value={value}>
      {props.children}
    </StoragePermissionContext.Provider>
  );
}

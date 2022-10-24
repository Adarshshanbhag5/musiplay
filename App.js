import React from 'react';
import AppEntry from './src/AppEntry';
import {StoragePermissionProvider} from './src/context/StoragePermissionContext';

const App = () => {
  return (
    <StoragePermissionProvider>
      <AppEntry />
    </StoragePermissionProvider>
  );
};

export default App;

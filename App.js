import React from 'react';
import AppEntry from './src/AppEntry';
import {StoragePermissionProvider} from './src/context/StoragePermissionContext';
import {UserThemeProvider} from './src/context/UserThemeContext';

const App = () => {
  return (
    <StoragePermissionProvider>
      <UserThemeProvider>
        <AppEntry />
      </UserThemeProvider>
    </StoragePermissionProvider>
  );
};

export default App;

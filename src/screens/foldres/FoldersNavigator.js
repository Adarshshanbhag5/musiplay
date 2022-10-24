import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Folders from './Folders';
import FolderInner from './FolderInner';

const Stack = createNativeStackNavigator();

const FoldersNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="InternalStorage">
      <Stack.Screen
        name="InternalStorage"
        component={Folders}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Music" component={FolderInner} />
    </Stack.Navigator>
  );
};

export default FoldersNavigator;

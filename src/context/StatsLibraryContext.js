import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext} from 'react';
import storageKeys from '../utils/StorageKeys';

export const StatsLibraryContext = createContext();
export const StatsLibraryProvider = ({children}) => {
  const [library, setLibrary] = useState([]);

  const value = {library, setLibrary};
  return (
    <StatsLibraryContext.Provider value={value}>
      {children}
    </StatsLibraryContext.Provider>
  );
};

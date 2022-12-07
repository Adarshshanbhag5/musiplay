import React, {createContext} from 'react';

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

import React, {createContext, useState} from 'react';
const defaultTheme = {
  theme: 'dark-amoled',
  accentColor: '#65ffa0',
};
export const UserThemeContext = createContext();
export const UserThemeProvider = ({children}) => {
  const [userTheme, setUserTheme] = useState(defaultTheme);
  const value = {userTheme, setUserTheme};
  return (
    <UserThemeContext.Provider value={value}>
      {children}
    </UserThemeContext.Provider>
  );
};

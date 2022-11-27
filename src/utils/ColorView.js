import {PixelRatio, Pressable, View} from 'react-native';
import React, {useContext} from 'react';
import {UserThemeContext} from '../context/UserThemeContext';

const ColorView = ({size = 32, backgroundColor, navigation}) => {
  const sizeFull = PixelRatio.roundToNearestPixel(size);
  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
  const {setUserTheme} = useContext(UserThemeContext);
  const pressHandler = () => {
    setUserTheme({theme: 'dark-amoled', accentColor: backgroundColor});
    navigation.goBack();
  };
  return (
    <Pressable onPress={pressHandler}>
      <View
        style={{
          width: sizeFull,
          height: sizeFull,
          borderRadius: sizeHalf,
          margin: 5,
          backgroundColor,
        }}
      />
    </Pressable>
  );
};

export default ColorView;

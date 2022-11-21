import {Pressable, StyleSheet} from 'react-native';
import React from 'react';

const Touch = ({children, onPress, onLongPress, style}) => {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({pressed}) => [
        {backgroundColor: pressed ? '#111' : 'transparent', ...style},
      ]}
      android_ripple={{color: '#222', borderless: false, foreground: '#000'}}>
      {children}
    </Pressable>
  );
};

export default Touch;

const styles = StyleSheet.create({});

import {Pressable, StyleSheet} from 'react-native';
import React from 'react';

const Touch = ({children, onPress, style}) => {
  return (
    <Pressable
      onPress={onPress}
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

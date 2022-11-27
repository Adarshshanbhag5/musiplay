import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RoundBtn = ({iconName, iconColor, bg, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={() => [{...style}]}
      android_ripple={{color: '#222', borderless: false, foreground: '#000'}}>
      <View
        style={{
          ...styles.btn__container,
          backgroundColor: bg ? bg : '#65ffa0',
        }}>
        <MaterialIcons name={iconName} color={iconColor} size={28} />
      </View>
    </Pressable>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  btn__container: {
    width: 60,
    height: 60,
    borderRadius: 30,

    // margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

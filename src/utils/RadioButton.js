import {PixelRatio, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RadioButton = ({
  size = 24,
  borderColor,
  color = '#65ffa0',
  selected = false,
  onPress,
  label,
}) => {
  const borderWidth = PixelRatio.roundToNearestPixel(size * 0.1);
  const sizeHalf = PixelRatio.roundToNearestPixel(size * 0.5);
  const sizeFull = PixelRatio.roundToNearestPixel(size);
  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <View
        style={[
          styles.border,
          {
            borderColor: borderColor || color,
            borderWidth,
            width: sizeFull,
            height: sizeFull,
            borderRadius: sizeHalf,
          },
        ]}>
        {selected && (
          <View
            style={{
              backgroundColor: color,
              width: sizeHalf,
              height: sizeHalf,
              borderRadius: sizeHalf,
            }}
          />
        )}
      </View>
      <Text style={selected ? {color: '#fff', ...styles.label} : styles.label}>
        {label}
      </Text>
    </Pressable>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  border: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 12,
    fontSize: 16,
  },
});

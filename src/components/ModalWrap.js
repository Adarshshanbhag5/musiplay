import {Pressable, StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';

const ModalWrap = ({children, navigation}) => {
  const {height} = useWindowDimensions();
  return (
    <View style={styles.modal__container}>
      <Pressable
        onPress={() => {
          navigation.popToTop();
        }}
        style={styles.backDrop}></Pressable>
      <View style={{...styles.modal, maxHeight: height - 100}}>{children}</View>
    </View>
  );
};

export default ModalWrap;

const styles = StyleSheet.create({
  modal__container: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 12,
    elevation: 8,
    backgroundColor: '#222',
    width: '90%',
    zIndex: 200,
  },
  backDrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
});

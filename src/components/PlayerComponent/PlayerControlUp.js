import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import globalStyle from '../../utils/GlobalStyle';

const PlayerControlUp = () => {
  return (
    <View style={[globalStyle.flex__row__space, styles.container]}>
      <View style={[globalStyle.flex__row__space, styles.left__container]}>
        <MaterialIcons name="favorite-border" color={'#fff'} size={26} />
        <MaterialIcons name="playlist-add" color={'#fff'} size={26} />
        <MaterialIcons
          name="more-horiz"
          color={'#000'}
          size={24}
          style={{backgroundColor: '#fff', borderRadius: 8}}
        />
      </View>
      <View style={globalStyle.flex__row__space}>
        <MaterialCommunityIcons name="shuffle" color={'#fff'} size={26} />
      </View>
    </View>
  );
};

export default PlayerControlUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  left__container: {
    width: '40%',
  },
});
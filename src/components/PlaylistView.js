import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Touch from '../utils/Touch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlaylistView = () => {
  return (
    <Touch>
      <View style={styles.playlist__container}>
        <MaterialIcons name="list" color={'#fff'} size={26} />
        <Text style={styles.playlist__text}>My playlist</Text>
      </View>
    </Touch>
  );
};

export default PlaylistView;

const styles = StyleSheet.create({
  playlist__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 20,
  },
  playlist__text: {
    marginLeft: 20,
    fontSize: 18,
    color: '#fff',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Touch from '../utils/Touch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const FolderListView = ({onPress, name}) => {
  return (
    <Touch onPress={onPress}>
      <View style={styles.folder__container}>
        <MaterialIcons name="folder-open" color={'#fff'} size={34} />
        <Text style={styles.folder__text}>{name}</Text>
      </View>
    </Touch>
  );
};

export default FolderListView;

const styles = StyleSheet.create({
  folder__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 20,
  },
  folder__text: {
    marginLeft: 20,
    fontSize: 18,
    color: '#fff',
  },
});

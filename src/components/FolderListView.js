import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Touch from '../utils/Touch';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const FolderListView = ({onPress, name, path}) => {
  return (
    <Touch onPress={onPress}>
      <View style={styles.folder__container}>
        <MaterialIcons name="folder-open" color={'#fff'} size={28} />
        <View>
          <Text style={styles.folder__text}>{name}</Text>
          <Text style={styles.path_text} numberOfLines={1} ellipsizeMode="tail">
            {path.replace('/storage/emulated/0', 'internal storage')}
          </Text>
        </View>
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
    fontSize: 16,
    color: '#fff',
  },
  path_text: {
    fontSize: 12,
    marginLeft: 20,
  },
});

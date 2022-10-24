import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const QueueListView = ({
  onPress,
  height,
  title,
  artist,
  artwork,
  album,
  duration,
}) => {
  return (
    <View style={{...styles.listContainer, height: parseInt(height, 10)}}>
      <View style={styles.innerContainer}>
        <View>
          <MaterialIcons
            name="drag-handle"
            color={'#fff'}
            size={24}
            style={{marginRight: 10}}
          />
        </View>
        <Image source={{uri: artwork}} style={styles.albumArt} />
        <View style={styles.innerContainer__textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{artist}</Text>
          <View style={styles.textBottomContainer}>
            <Text style={styles.text}>{album}</Text>
            <Text style={styles.text}>{duration}</Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableHighlight onPress={onPress}>
          <MaterialIcons
            name="more-horiz"
            color={'#000'}
            size={24}
            style={{backgroundColor: '#fff', borderRadius: 8}}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default QueueListView;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  albumArt: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  innerContainer__textContainer: {
    width: '75%',
  },
  title: {
    fontSize: 16,
    marginBottom: 1,
    color: '#fff',
  },
  text: {
    marginBottom: 1,
    color: '#fff',
    fontSize: 12,
  },
  textBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});

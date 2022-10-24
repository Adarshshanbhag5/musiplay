import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import globalStyle from '../utils/GlobalStyle';

const SongListView = ({
  album,
  artist,
  title,
  cover,
  duration,
  filePath,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#B4E197' : 'transparent',
        },
      ]}>
      <View style={styles.listContainer}>
        <View style={styles.innerContainer}>
          <Image source={{uri: cover}} style={styles.albumArt} />
          <View style={styles.innerContainer__textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{artist}</Text>
            <View style={globalStyle.flex__row__space}>
              <Text style={styles.text}>{album}</Text>
              <Text style={styles.text}>
                {new Date(duration * 1).toISOString().slice(14, 19)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableHighlight onPress={() => {}}>
            <MaterialIcons
              name="more-horiz"
              color={'#000'}
              size={24}
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                marginHorizontal: 10,
              }}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Pressable>
  );
};

export default SongListView;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    // paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  albumArt: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  innerContainer__textContainer: {
    flex: 1,
    marginHorizontal: 10,
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
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});

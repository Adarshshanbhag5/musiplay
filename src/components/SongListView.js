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
import {useNavigation} from '@react-navigation/native';
const SongListView = ({data, onPress}) => {
  const navigation = useNavigation();
  const handleOptionPress = () => {
    navigation.navigate('option-modal', {data});
  };
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
          <Image
            source={
              data.artwork
                ? {uri: data.artwork}
                : require('../../assets/artwork_placeholder.png')
            }
            style={styles.albumArt}
          />
          <View style={styles.innerContainer__textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {data.title}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
              {data.artist}
            </Text>
            <View style={globalStyle.flex__row__space}>
              <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
                {data.album}
              </Text>
              <Text style={styles.text}>
                {new Date(data.duration * 1000).toISOString().slice(14, 19)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <TouchableHighlight onPress={handleOptionPress}>
            <MaterialIcons
              name="more-horiz"
              color={'#000'}
              size={22}
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                margin: 15,
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
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  innerContainer__textContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 1,
    color: '#fff',
    fontSize: 11,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});

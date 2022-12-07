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
import {useNavigation} from '@react-navigation/native';

const QueueListView = ({
  // height,
  color,
  onPress,
  data,
}) => {
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
      <View style={{...styles.listContainer}}>
        <View style={styles.innerContainer}>
          {/* <GestureDetector gesture={gesture}>
            <MaterialIcons
              name="drag-handle"
              color={color}
              size={24}
              style={{marginRight: 10, backgroundColor: 'green', padding: 5}}
            />
          </GestureDetector> */}

          <Image
            source={
              data.artwork
                ? {uri: data.artwork}
                : require('../../assets/artwork_placeholder.png')
            }
            style={styles.albumArt}
          />
          <View style={styles.innerContainer__textContainer}>
            <Text
              style={{...styles.title, color}}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {data.title}
            </Text>
            <Text
              style={{...styles.text, color}}
              ellipsizeMode="tail"
              numberOfLines={1}>
              {data.artist}
            </Text>
            <View style={styles.textBottomContainer}>
              <Text
                style={{...styles.text, color}}
                ellipsizeMode="tail"
                numberOfLines={2}>
                {data.album}
              </Text>
              <Text style={{...styles.text, color}}>
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
              style={{backgroundColor: color, borderRadius: 8}}
            />
          </TouchableHighlight>
        </View>
      </View>
    </Pressable>
  );
};

export default QueueListView;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 5,
    paddingVertical: 5,
    // paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  albumArt: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  innerContainer__textContainer: {
    width: '75%',
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

import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useEffect, useState} from 'react';
import globalStyle from '../../utils/GlobalStyle';
import {useNavigation} from '@react-navigation/native';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';

const PlayerControlUp = ({track}) => {
  const navigation = useNavigation();
  const {favoriteList, setFavoriteSong} = usePlaylistContext();
  const [heart, setHeart] = useState(false);
  const addPlaylist = () => {
    if (track) {
      navigation.navigate('addPlaylist-modal', {data: track});
    }
  };
  const optionPress = () => {
    if (track) {
      navigation.navigate('option-modal', {data: track});
    }
  };
  useEffect(() => {
    if (favoriteList && track) {
      favoriteList.includes(track.id) ? setHeart(true) : setHeart(false);
    }
  }, [track, favoriteList]);
  return (
    <View style={[globalStyle.flex__row__space, styles.container]}>
      <View style={[globalStyle.flex__row__space, styles.left__container]}>
        <MaterialIcons
          name={heart ? 'favorite' : 'favorite-border'}
          color={'#fff'}
          size={26}
          onPress={() => {
            if (track) {
              setFavoriteSong(track.id);
            }
          }}
        />
        <MaterialIcons
          name="playlist-add"
          color={'#fff'}
          size={26}
          onPress={addPlaylist}
        />
        <MaterialIcons
          name="more-horiz"
          color={'#000'}
          size={24}
          style={{backgroundColor: '#fff', borderRadius: 8}}
          onPress={optionPress}
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

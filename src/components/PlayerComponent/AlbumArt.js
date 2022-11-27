import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {State, usePlaybackState} from 'react-native-track-player';

const AlbumArt = ({artwork}) => {
  const state = usePlaybackState();
  const isPlaying = state === State.Playing;
  return (
    <View style={styles.image__container}>
      <Image
        source={
          artwork
            ? {
                uri: artwork,
              }
            : require('../../../assets/artwork_placeholder.png')
        }
        style={
          isPlaying
            ? {...styles.albumArt}
            : {...styles.albumArt, transform: [{scale: 0.9}]}
        }
      />
    </View>
  );
};

export default AlbumArt;

const styles = StyleSheet.create({
  image__container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 50,
  },
  albumArt: {
    width: '85%',
    height: 320,
    resizeMode: 'cover',
    elevation: 10,
    shadowColor: '#000',
    shadowRadius: 10,
  },
});

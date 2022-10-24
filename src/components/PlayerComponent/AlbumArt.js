import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

const AlbumArt = ({artwork}) => {
  return (
    <View style={styles.image__container}>
      <Image
        source={{
          uri: artwork,
        }}
        style={styles.albumArt}
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
    elevation: 8,
  },
});
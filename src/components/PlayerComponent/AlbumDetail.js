import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AlbumDetail = ({title, artist, album}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{artist}</Text>
      <Text style={styles.text}>{album}</Text>
    </View>
  );
};

export default AlbumDetail;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
  },
});

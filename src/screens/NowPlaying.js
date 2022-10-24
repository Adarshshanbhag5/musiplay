import {StyleSheet, View} from 'react-native';
import React from 'react';
import AlbumArt from '../components/PlayerComponent/AlbumArt';
import AlbumDetail from '../components/PlayerComponent/AlbumDetail';
import Player from '../components/PlayerComponent/Player';
import useCurrentTrack from '../hooks/useCurrentTrack';

const NowPlaying = () => {
  const track = useCurrentTrack();
  if (track) {
    return (
      <View style={styles.container}>
        <AlbumArt artwork={track.artwork} />
        <AlbumDetail
          title={track.title}
          artist={track.artist}
          album={track.album}
        />
        <Player />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <AlbumArt />
        <AlbumDetail
          title={'[No song in queue]'}
          artist={'[unknown]'}
          album={'[unknown]'}
        />
        <Player />
      </View>
    );
  }
};

export default NowPlaying;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
  },
});

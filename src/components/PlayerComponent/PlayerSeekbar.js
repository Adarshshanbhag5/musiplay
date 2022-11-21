import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle from '../../utils/GlobalStyle';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';

const PlayerSeekbar = () => {
  const progress = useProgress();
  return (
    <View
      style={[globalStyle.flex__row__space, styles.playerSeekbar__container]}>
      <Text style={styles.duration__text}>
        {new Date(progress.position * 1000).toISOString().slice(14, 19)}
      </Text>
      <Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        onSlidingComplete={TrackPlayer.seekTo}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#aaa"
        thumbTintColor="#fff"
        style={styles.seekBar}
      />
      <Text style={styles.duration__text}>
        {new Date((progress.duration - progress.position) * 1000)
          .toISOString()
          .slice(14, 19)}
      </Text>
    </View>
  );
};

export default PlayerSeekbar;

const styles = StyleSheet.create({
  playerSeekbar__container: {
    marginTop: 30,
    justifyContent: 'center',
  },
  seekBar: {
    width: '80%',
    marginHorizontal: 3,
  },
  duration__text: {
    marginHorizontal: 0,
    color: '#fff',
  },
});

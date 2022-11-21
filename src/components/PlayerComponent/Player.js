import {StyleSheet, View} from 'react-native';
import React from 'react';
import PlayerControlUp from './PlayerControlUp';
import PlayerControlBottom from './PlayerControlBottom';
import PlayerSeekbar from './PlayerSeekbar';

const Player = ({track}) => {
  return (
    <View>
      <PlayerControlUp track={track} />
      <PlayerSeekbar />
      <PlayerControlBottom />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});

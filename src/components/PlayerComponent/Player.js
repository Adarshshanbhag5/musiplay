import {StyleSheet, View} from 'react-native';
import React from 'react';
import PlayerControlUp from './PlayerControlUp';
import PlayerControlBottom from './PlayerControlBottom';
import PlayerSeekbar from './PlayerSeekbar';

const Player = () => {
  return (
    <View>
      <PlayerControlUp />
      <PlayerSeekbar />
      <PlayerControlBottom />
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({});

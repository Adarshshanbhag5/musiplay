import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import React, {useCallback, useContext} from 'react';
import useCurrentQueue from '../hooks/useCurrentQueue';
import TrackPlayer from 'react-native-track-player';
import QueueListView from '../components/QueueListView';
import {UserThemeContext} from '../context/UserThemeContext';

const Queues = () => {
  const {queue, trackIndex} = useCurrentQueue();
  const {userTheme} = useContext(UserThemeContext);
  const renderItem = useCallback(
    ({item, index}) => {
      const borderColor =
        trackIndex === index ? userTheme.accentColor : 'transparent';
      const color = trackIndex === index ? userTheme.accentColor : '#fff';
      return (
        <View style={{...styles.renderItemView, borderColor}}>
          <QueueListView
            color={color}
            data={item}
            onPress={() => {
              handlePress(index);
            }}
          />
        </View>
      );
    },
    [handlePress, trackIndex, userTheme],
  );

  const handlePress = async index => {
    await TrackPlayer.skip(index);
    TrackPlayer.play();
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="search in this queue..."
        />
      </View>
      {queue && (
        <FlatList
          data={queue}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={trackIndex}
        />
      )}
      {/* <TestScreen queue={queue} /> */}
    </View>
  );
};

export default Queues;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 15,
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
  },
  renderItemView: {
    borderRadius: 5,
    borderWidth: 2,
    paddingVertical: 5,
  },
});

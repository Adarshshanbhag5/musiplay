import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useCallback, useContext, useState} from 'react';
import useCurrentQueue from '../hooks/useCurrentQueue';
import TrackPlayer from 'react-native-track-player';
import QueueListView from '../components/QueueListView';
import {UserThemeContext} from '../context/UserThemeContext';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const ITEM_HEIGHT = 75;

const Queues = () => {
  const {queue, trackIndex} = useCurrentQueue();
  const {userTheme} = useContext(UserThemeContext);
  const [moving, setMoving] = useState(false);
  const topValue = useSharedValue(0);
  const panGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onStart(() => {
      // console.log('started!');
      runOnJS(setMoving)(true);
    })
    .onChange(e => {
      topValue.value = e.absoluteY - 90;
    })
    .onFinalize(() => {
      // console.log('finalised!');
      topValue.value = 0;
      runOnJS(setMoving)(false);
    })
    .onEnd(() => {
      // console.log('ended!');
      topValue.value = 0;
      runOnJS(setMoving)(false);
    });

  const movingItem = useAnimatedStyle(() => ({
    top: withSpring(topValue.value),
  }));

  const RenderItem = useCallback(
    ({item, index}) => {
      const borderColor =
        trackIndex === index ? userTheme.accentColor : 'transparent';
      const color = trackIndex === index ? userTheme.accentColor : '#fff';
      return (
        <View style={{...styles.renderItemView, borderColor}}>
          <GestureDetector gesture={panGesture}>
            <View
              collapsable={false}
              style={{
                backgroundColor: 'green',
                padding: 10,
                marginLeft: 10,
                paddingHorizontal: 15,
              }}>
              <MaterialIcons name="drag-handle" color={color} size={24} />
            </View>
          </GestureDetector>
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
    [handlePress, panGesture, userTheme],
  );

  const handlePress = async index => {
    await TrackPlayer.skip(index);
    TrackPlayer.play();
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="search in this queue..."
        />
      </View>
      {moving && (
        <Animated.View style={[styles.movingView, movingItem]}>
          <Text>Hello this is item</Text>
        </Animated.View>
      )}
      {queue && (
        <FlatList
          scrollEnabled={!moving}
          data={queue}
          renderItem={RenderItem}
          keyExtractor={item => item.id}
          extraData={trackIndex}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      )}
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    paddingVertical: 5,
    zIndex: 5,
  },
  movingView: {
    position: 'absolute',
    width: '100%',
    height: ITEM_HEIGHT,
    zIndex: 10,
    backgroundColor: 'pink',
  },
});

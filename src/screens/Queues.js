import {Pressable, StyleSheet, TextInput, Vibration, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import useCurrentQueue from '../hooks/useCurrentQueue';
import TrackPlayer from 'react-native-track-player';
import QueueListView from '../components/QueueListView';
import {UserThemeContext} from '../context/UserThemeContext';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {setDragFalg} from '../services/PlaybackService';

const Queues = () => {
  const {queue, trackIndex} = useCurrentQueue();
  const {userTheme} = useContext(UserThemeContext);
  const [listData, setListData] = useState([]);
  useEffect(() => {
    setListData(queue);
  }, [queue]);

  const renderItem = useCallback(
    ({item, drag, isActive, getIndex}) => {
      const borderColor =
        trackIndex === getIndex() ? userTheme.accentColor : 'transparent';
      const color = trackIndex === getIndex() ? userTheme.accentColor : '#fff';
      return (
        <View style={{...styles.renderItemView, borderColor}}>
          <Pressable
            onLongPress={() => {
              Vibration.vibrate(40);
              drag();
            }}
            disabled={isActive}>
            <View
              style={{
                // backgroundColor: 'green',
                paddingHorizontal: 5,
                marginLeft: 10,
              }}>
              <MaterialIcons name="drag-handle" color={color} size={24} />
            </View>
          </Pressable>
          <QueueListView
            color={color}
            data={item}
            onPress={() => {
              handlePress(getIndex());
            }}
          />
        </View>
      );
    },
    [handlePress, userTheme, trackIndex],
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
      {listData && (
        <DraggableFlatList
          data={listData}
          renderItem={renderItem}
          extraData={trackIndex}
          keyExtractor={item => item.id}
          onDragEnd={({data, from, to}) => {
            setListData(data);
            if (from === to) {
              setDragFalg(false, data);
            } else {
              setDragFalg(true, data);
            }
          }}
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
    paddingVertical: 2,
    zIndex: 5,
  },
});

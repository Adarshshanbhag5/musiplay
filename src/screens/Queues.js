import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import React, {useEffect, useState} from 'react';

import QueueOptions from '../components/QueueOptions';
import TestScreen from './TestScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import QueueListView from '../components/QueueListView';
import TrackPlayer from 'react-native-track-player';
import {useTrackContext} from '../hooks/useTrackContext';

const Queues = () => {
  const {queue} = useTrackContext();
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(queue);
  function pressHandler() {
    setModalVisible(!modalVisible);
  }
  if (queue) {
    return (
      <View style={{flex: 1}}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="search in this queue..."
          />
        </View>
        {/* <TestScreen queue={queue} /> */}
        <QueueOptions modal={modalVisible} onPress={pressHandler} />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
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
});

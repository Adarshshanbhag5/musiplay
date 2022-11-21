import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext, useState} from 'react';
// import FolderListView from '../../components/FolderListView';
import SongListView from '../../components/SongListView';
import AddQueueService from '../../services/AddQueueService';

const FolderInner = ({route, navigation}) => {
  async function handlePress(startIndex) {
    let track = route.params.data.files;
    await AddQueueService(track, startIndex);
    navigation.navigate('NowPlaying');
  }

  const renderItem = useCallback(
    ({item, index}) => (
      <SongListView
        data={item}
        onPress={() => {
          handlePress(index);
        }}
      />
    ),
    [handlePress],
  );

  // console.log(route.params.data);

  return (
    <View style={{flex: 1}}>
      <View style={styles.header__container}>
        <Text
          style={styles.path__text}>{`Path: ${route.params.data.path}`}</Text>
        <View style={styles.details__container}>
          <Text
            style={{
              marginRight: 10,
            }}>{`${route.params.data.totalFiles} songs`}</Text>
          <Text
            style={{
              marginRight: 10,
            }}>{`${route.params.data.totalDuration}`}</Text>
        </View>
      </View>
      {
        <FlatList
          data={route.params.data.files}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      }
      {/* <OptionsModal
        modal={state.modalOpen}
        data={state.optionData}
        modalCase={state.modalCase}
      /> */}
    </View>
  );
};

export default FolderInner;

const styles = StyleSheet.create({
  header__container: {
    paddingHorizontal: 12,
    marginVertical: 18,
  },

  details__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
  },
  path__text: {
    marginBottom: 10,
    color: '#fff',
  },
});

import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../utils/GlobalStyle';
import React from 'react';
import OptionsView from './OptionsView';

const QueueOptions = ({data, modal, onPress}) => {
  async function addToPlaylistHandler() {}
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        onPress();
      }}>
      <Pressable onPress={onPress} style={styles.modal__container}>
        <View style={styles.cont}>
          <View
            style={[globalStyle.flex__row__space, styles.header__container]}>
            <Text style={styles.header__text}>{data.title}</Text>
            <MaterialIcons name="favorite-border" color={'#fff'} size={26} />
          </View>
          <View
            style={{
              ...styles.modal__inner__container,
              borderBottomWidth: 1,
              borderColor: '#555',
            }}>
            <OptionsView text="Song info" icon="info-outline" />
            <OptionsView
              text="Remove from this queue"
              icon="remove-circle-outline"
            />
          </View>
          <View style={styles.modal__inner__container}>
            <OptionsView icon="skip-next" text="Play after current song" />
            <OptionsView icon="queue-music" text="Add to a queue" />
            <OptionsView
              icon="playlist-add"
              text="Add to playlists"
              onPress={addToPlaylistHandler}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default QueueOptions;

const styles = StyleSheet.create({
  modal__container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  modal__inner__container: {
    paddingBottom: 12,
    marginTop: 10,
  },
  header__container: {
    marginHorizontal: 20,
  },
  header__text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  cont: {
    paddingHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: '#222',
    width: '90%',
  },
});

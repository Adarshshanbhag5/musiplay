import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalWrap from '../../components/ModalWrap';
import OptionsView from '../../components/OptionsView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../../utils/GlobalStyle';

const OptionModal = ({route, navigation}) => {
  return (
    <ModalWrap navigation={navigation}>
      <View style={[globalStyle.flex__row__space, styles.header__container]}>
        <Text
          style={styles.header__text}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {route.params.data.title}
        </Text>
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
          onPress={() => {
            navigation.replace('addPlaylist-modal', {data: route.params.data});
          }}
        />
      </View>
    </ModalWrap>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modal__inner__container: {
    marginTop: 10,
  },
  header__container: {
    marginHorizontal: 20,
  },
  header__text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

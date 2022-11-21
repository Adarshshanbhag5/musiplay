import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import globalStyle from '../../utils/GlobalStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectableList from '../../components/SelectableList';
import {usePlaylistContext} from '../../hooks/usePlaylistContext';
import PlaylistAddService from '../../services/PlaylistAddService';
import ModalWrap from '../../components/ModalWrap';
import Touch from '../../utils/Touch';

const AddPlaylistModal = ({route, navigation}) => {
  const [selectId, setSelectId] = useState(null);
  const {playlist} = usePlaylistContext();
  // console.log(route.params.data);
  async function okHandler() {
    if (selectId != null) {
      await PlaylistAddService(route.params.data.id, selectId);
    }
    close();
  }
  function close() {
    navigation.goBack();
  }
  return (
    <ModalWrap navigation={navigation}>
      <View style={styles.upper__view}>
        <Text style={styles.head_text}>{route.params.data.title}</Text>
      </View>
      {playlist && (
        <SelectableList
          DATA={playlist}
          selectId={selectId}
          setSelectId={setSelectId}
        />
      )}
      <TouchableOpacity onPress={() => {}}>
        <View style={[globalStyle.flex__row__space, styles.add__playlist__btn]}>
          <MaterialIcons
            name="playlist-add"
            color={'#3AB0FF'}
            size={26}
            style={{fontWeight: 'bold'}}
          />
          <Text style={{color: '#fff', fontWeight: '600', fontSize: 16}}>
            New playlist
          </Text>
        </View>
      </TouchableOpacity>
      <View style={[globalStyle.flex__row__end, styles.control__container]}>
        <Touch onPress={close} style={styles.control__btn}>
          <Text style={styles.text}>Cancel</Text>
        </Touch>
        <Touch style={styles.control__btn} onPress={okHandler}>
          <Text style={styles.text}>Ok</Text>
        </Touch>
      </View>
      {/* <ModalControlBtn cancelPress={close} okPress={okHandler} /> */}
    </ModalWrap>
  );
};

const styles = StyleSheet.create({
  add__playlist__btn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#555',
    maxWidth: '40%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 20,
    marginTop: 10,
  },
  head_text: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  upper__view: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  control__container: {
    marginTop: 10,
  },
  control__btn: {
    marginHorizontal: 15,
  },
  text: {
    color: '#B4E197',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
});

export default AddPlaylistModal;

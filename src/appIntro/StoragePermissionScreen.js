import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import globalStyle from '../utils/GlobalStyle';
import {TouchableHighlight} from 'react-native-gesture-handler';
import RoundBtn from '../utils/RoundBtn';
import {StoragePermissionContext} from '../context/StoragePermissionContext';

const StoragePermissionScreen = ({navigation, withIntro = true}) => {
  const {getPermission} = useContext(StoragePermissionContext);
  return (
    <View style={styles.container}>
      <View style={[globalStyle.flex__col__center, styles.icon__container]}>
        <MaterialIcons name="folder-open" color={'#fff'} size={38} />
      </View>
      <View style={globalStyle.flex__col__center}>
        <View style={globalStyle.flex__row__start}>
          <Text style={styles.text}>Musiplay requires</Text>
          <Text style={[styles.text, styles.bold__text]}>Storage</Text>
        </View>
        <Text style={{...styles.text, marginTop: 5}}>Permission:</Text>
      </View>
      <View style={styles.section__container}>
        <Text style={styles.list__text}>
          1. To read audio files and its tags
        </Text>
        <Text style={styles.list__text}>2. To load AlbumArt cover photos</Text>
      </View>
      <Pressable style={globalStyle.flex__col__center} onPress={getPermission}>
        <View style={[globalStyle.flex__row__space, styles.btn]}>
          <MaterialIcons name="folder-open" color={'#000'} size={26} />
          <Text style={styles.btn__text}>STORAGE PERMISSION</Text>
        </View>
      </Pressable>
      {withIntro && (
        <>
          <View style={styles.next__btn}>
            <RoundBtn iconColor={'#000'} iconName={'navigate-next'} />
          </View>
          <View style={styles.prev__btn}>
            <RoundBtn
              iconColor={'#fff'}
              iconName={'navigate-before'}
              bg={'#555'}
              onPress={() => {
                navigation.navigate('intro');
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default StoragePermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon__container: {
    marginVertical: 20,
  },
  section__container: {
    marginBottom: 10,
    marginTop: 25,
  },
  list__text: {
    marginBottom: 5,
    fontSize: 16,
    color: '#fff',
  },
  bold__text: {
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  text__bold: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  btn: {
    backgroundColor: '#7cfc00',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  btn__text: {
    color: '#000',
    textTransform: 'uppercase',
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 15,
  },
  next__btn: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  prev__btn: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
});

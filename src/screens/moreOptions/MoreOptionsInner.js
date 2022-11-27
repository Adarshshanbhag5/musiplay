import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Touch from '../../utils/Touch';

const MoreOptionsInner = ({navigation}) => {
  return (
    <>
      <Touch
        onPress={() => {
          navigation.navigate('Appsettings');
        }}>
        <View style={styles.options__container}>
          <MaterialIcons name="settings" color={'#fff'} size={28} />
          <Text style={styles.options__text}>Settings</Text>
        </View>
      </Touch>
      <Touch
        onPress={() => {
          navigation.navigate('sleep_timer');
        }}>
        <View style={styles.options__container}>
          <MaterialIcons name="snooze" color={'#fff'} size={28} />
          <Text style={styles.options__text}>Sleep timer</Text>
        </View>
      </Touch>
      <Touch
        onPress={() => {
          navigation.navigate('Help_and_info');
        }}>
        <View style={styles.options__container}>
          <MaterialIcons name="help" color={'#fff'} size={28} />
          <Text style={styles.options__text}>Help and Info</Text>
        </View>
      </Touch>
    </>
  );
};

export default MoreOptionsInner;

const styles = StyleSheet.create({
  options__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    paddingLeft: 20,
  },
  options__text: {
    marginLeft: 20,
    fontSize: 16,
    color: '#fff',
  },
});

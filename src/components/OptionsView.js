import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const OptionsView = ({text, icon}) => {
  return (
    <TouchableHighlight
      underlayColor={'#00A0F3'}
      activeOpacity={0.6}
      onPress={() => {}}
      style={{borderRadius: 5}}>
      <View style={styles.playlist__container}>
        <MaterialIcons name={icon} color={'#fff'} size={26} />
        <Text style={styles.playlist__text}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default OptionsView;

const styles = StyleSheet.create({
  playlist__container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 35,
  },
  playlist__text: {
    marginLeft: 20,
    fontSize: 18,
    color: '#fff',
  },
});

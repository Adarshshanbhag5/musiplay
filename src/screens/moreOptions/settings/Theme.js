import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import RadioButton from '../../../utils/RadioButton';

const radioGroup = [
  {
    label: 'Light theme',
    key: '0',
  },
  {
    label: 'Black (Amoled)',
    key: '1',
  },
];

const Theme = ({navigation}) => {
  const [selectedId, setselectedId] = useState('0');
  const renderItem = ({item}) => {
    const selected = item.key === selectedId ? true : false;
    return (
      <RadioButton
        label={item.label}
        selected={selected}
        onPress={() => {
          setselectedId(item.key);
        }}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={radioGroup}
        renderItem={renderItem}
        extraData={selectedId}
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          navigation.navigate('colorpalletmodal');
        }}>
        <Text style={styles.btn__text}>Accent color</Text>
      </Pressable>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 5,
    width: '30%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  btn__text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

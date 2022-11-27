import {View, Text} from 'react-native';
import React from 'react';

const Settings = ({navigation}) => {
  return (
    <View>
      <Text
        style={{padding: 10, margin: 20, fontWeight: 'bold', fontSize: 18}}
        onPress={() => {
          navigation.navigate('theme');
        }}>
        Theme
      </Text>
    </View>
  );
};

export default Settings;

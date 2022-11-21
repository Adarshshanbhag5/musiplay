import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FolderListView from '../../components/FolderListView';
import {useFileSystem} from '../../hooks/useFileSystem';

// import RNFS from 'react-native-fs';

const Folders = ({navigation}) => {
  const {fsData} = useFileSystem();

  const renderItem = useCallback(
    ({item}) => (
      <FolderListView
        onPress={() => {
          handlePress(item);
        }}
        name={item.folderHierarchy[0]}
      />
    ),
    [handlePress],
  );

  const handlePress = item => {
    navigation.navigate('Music', {
      data: item,
      hierarchyCount: 1,
    });
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <MaterialIcons name="folder-special" color={'#fff'} size={28} />
        <Text style={styles.header__text}>Internal Storage</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text>20 songs</Text>
        <Text>1:38:15</Text>
      </View>
      {fsData && (
        <FlatList
          data={fsData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default Folders;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  header__text: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingBottom: 15,
    paddingHorizontal: 12,
    marginVertical: 18,
  },
});

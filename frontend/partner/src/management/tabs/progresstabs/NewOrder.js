import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {TabProgressContext} from '../TabProgress';

const Item = ({item, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.id}</Text>
    </TouchableOpacity>
  );
};

const NewOrder = ({route}) => {
  const {selectedNewId, setSelectedNewId, setSelectedNewOrder} =
    useContext(TabProgressContext);

  const setNewOrder = item => {
    setSelectedNewId(item.id);
    console.log(item);
    setSelectedNewOrder(item);
  };
  // 현재 ORDERED로 들어오고 있는것, PAID로 들어오는것으로 바꿔줘야함
  const {DATA} = route.params;

  // 실시간 처리에 대해서 생각을 해봐야 할 듯
  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(DATA);
  }, []);

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedNewId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedNewId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setNewOrder(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedNewId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default NewOrder;

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

const OnGoingOrder = ({route}) => {
  const {selectedPreparingId, setSelectedPreparingId, setSelectedOrder} =
    useContext(TabProgressContext);

  const setPreparingOrder = item => {
    setSelectedPreparingId(item.id);
    setSelectedOrder(item);
  };
  // 현재 ORDERED로 들어오고 있는것, PAID로 들어오는것으로 바꿔줘야함
  const {DATA} = route.params;

  const renderItem = ({item}) => {
    const backgroundColor =
      item.id === selectedPreparingId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedPreparingId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setPreparingOrder(item)}
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
        extraData={selectedPreparingId}
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

export default OnGoingOrder;

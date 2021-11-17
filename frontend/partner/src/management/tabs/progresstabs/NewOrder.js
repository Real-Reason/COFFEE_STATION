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
      <Text style={[styles.title, textColor]}>{item.orderId}</Text>
    </TouchableOpacity>
  );
};

const NewOrder = ({}) => {
  const {selectedNewId, setSelectedNewId, setSelectedOrder, paiedOrders} =
    useContext(TabProgressContext);

  const setNewOrder = item => {
    setSelectedNewId(item.orderId);
    setSelectedOrder(item);
  };

  const renderItem = ({item}) => {
    const backgroundColor =
      item.orderId === selectedNewId ? '#6e3b6e' : '#f9c2ff';
    const color = item.orderId === selectedNewId ? 'white' : 'black';

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
        data={paiedOrders}
        renderItem={renderItem}
        keyExtractor={item => item.orderId}
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

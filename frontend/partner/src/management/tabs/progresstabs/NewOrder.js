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
import styled from 'styled-components/native';

const StTouchable = styled.TouchableOpacity`
  margin: 2px;
`;

const StText = styled.Text`
  padding: 10px;
  /* font-size: 10px; */
  font-family: 'InfinitySans-Bold';
`;

const Item = ({item, onPress, backgroundColor, textColor, borderColor}) => {
  return (
    <StTouchable
      onPress={onPress}
      style={[styles.item, backgroundColor, borderColor]}>
      <StText style={[styles.title, textColor]}>
        {item.menus[0].menuName} ({item.menus[0].quantity}){' '}
        {item.menus.length === 1 ? '' : '외 '}
        {item.menus.length === 1 ? 1 : item.menus.length - 1}건
      </StText>
    </StTouchable>
  );
};

const NewOrder = ({}) => {
  const {
    selectedNewId,
    setSelectedNewId,
    setSelectedOrder,
    paidOrders,
    setSelectedOrderMenus,
  } = useContext(TabProgressContext);

  const setNewOrder = item => {
    setSelectedNewId(item.orderId);
    setSelectedOrder(item);
    setSelectedOrderMenus(item.menus);
  };
  useEffect(() => {
    console.log(paidOrders);
    if (paidOrders.length !== 0) {
      setSelectedNewId(paidOrders[0].orderId);
      // console.log('ㅗㅑㅇㄹㄴㅇㄹ');
      setSelectedOrder(paidOrders[0]);
    }
  }, []);
  const renderItem = ({item}) => {
    const backgroundColor =
      item.orderId === selectedNewId ? '#ff7f00' : 'white';
    const color = item.orderId === selectedNewId ? 'white' : 'black';
    const borderColor = item.orderId === selectedNewId ? 'white' : '#ff7f00';

    return (
      <Item
        item={item}
        onPress={() => setNewOrder(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderColor={{borderColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={paidOrders}
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
    borderWidth: 0.5,
  },
  title: {
    fontSize: 32,
  },
});

export default NewOrder;

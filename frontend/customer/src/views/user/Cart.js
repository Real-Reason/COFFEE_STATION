import React, { useEffect, useState } from 'react';
import {  Text, Button, ScrollView, RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {

  const [cartList, setCartList] = useState({'items': []});
  const [refreshing, setRefreshing] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const getCartList = async() => {
    console.log('장바구니가져와');
    try {
      setCartList(JSON.parse(await AsyncStorage.getItem('cartList')));
      console.log(cartList);
      console.log(typeof(cartList));
      setIsCart(true);
    } catch (e) {
      console.log(e);
    }
  }

  const clearCartList = async() => {
    try{
      await AsyncStorage.removeItem('cartList');
    } catch (e) {
      console.log(e);
    }
    setCartList({'items': []});
    setIsCart(false);
  }

  return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCartList} 
          />
        }
      >
        <Text>Cart</Text>
        {
          isCart
          ? (<Text></Text>)
          : (<Text>없습니다.</Text>)
        }
        {cartList.items.map((cartmenu, index) => (
              <Pressable key={index} onPress={() => alert(index)}>
                <Text> { cartmenu.item.name }, {cartmenu.count}개, { cartmenu.item.price * cartmenu.count }원 </Text>
              </Pressable>
        ))}
        <Button title='주문하기' onPress={() => alert('주문페이지 예정')}></Button>
        <Button title='장바구니 비우기' onPress={() => clearCartList()}></Button>
      </ScrollView>
  );
}

export default Cart;
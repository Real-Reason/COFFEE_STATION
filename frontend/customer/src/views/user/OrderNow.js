import React, { useEffect, useState } from 'react';
import {  Text, Button, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderNow = ({ route }) => {

  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    console.log(route.params);
    setOrderItems(route.params);
  }, []);

  const money = async() => {
    console.log('오더용으로 다시 구조 만들어');
    let orderMenuList = [];
    let tmp = {};
    orderItems.forEach((item, index) => {
      // console.log(item);
      tmp = { menuId: item.menuId, extraIdList: item.extraIdList, menuSizeId: item.menuSizeId, quantity: item.count };
      orderMenuList.push(tmp);
    })
    console.log({orderMenuList});
    const data = {orderMenuList};
    // console.log(orderItems[0].cafeId);

    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `http://3.38.99.110:8080/api/customer/shop/${orderItems[0].cafeId}/order`, 
        data,
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      <Text> order </Text>
      {orderItems.map((item, index) => (
        <Text key={index}> { item.item.name } </Text>
      ))}
      <Button title="결제하기" onPress={() => money()}></Button>
    </ScrollView>
  )
}

export default OrderNow
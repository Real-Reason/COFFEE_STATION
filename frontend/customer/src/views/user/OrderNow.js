import React, { useEffect, useState } from 'react';
import {  Text, Button, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderNow = ({ navigation, route }) => {

  const [orderItems, setOrderItems] = useState([]);
  const [request, onChangeText] = useState("주문 요청 사항을 입력해주세요");

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
    const data = {orderMenuList, request};
    // console.log(orderItems[0].cafeId);

    let JWTToken = await AsyncStorage.getItem('userToken');
    let orderCheck

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/customer/shop/${orderItems[0].cafeId}/order`, 
        data,
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      orderCheck = {
        orderInfo: response.data, 
        cafeId: orderItems[0].cafeId, 
        orderItem: orderItems[0].item.name, 
        orderItemCount: orderItems.length}
      // navigation.navigate('Paystart', orderCheck);
    } catch (e) {
      console.log(e);
    }

    console.log('kakaopay READY');
    const paydata = {
      "cid" : "TC0ONETIME",
      "partner_order_id" : orderCheck.orderInfo.id,
      "partner_user_id" : orderCheck.cafeId,
      "item_name" : `${orderCheck.orderItem} 외 ${orderCheck.orderItemCount} 건`,
      "quantity" : "1",
      "total_amount" : `${orderCheck.orderInfo.totalPrice}`,
      "tax_free_amount" : "0",
      "approval_url" : "http://localhost:8080/api/test/kakaoPaySuccess",
      "cancel_url" : "http://localhost:8080/kakaoPayCancel",
      "fail_url" : "http://localhost:8080/kakaoPaySuccessFail"
    };
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}kakaoPay/ready`, 
        paydata,
      );
      console.log(response.data);
      const payInfo = {
        paysuccess: response.data, 
        partner_order_id: orderCheck.orderInfo.id, 
        partner_user_id: orderCheck.cafeId
      }
      navigation.navigate('Paystart', payInfo);
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
      <TextInput 
        onChangeText={ onChangeText }
        value={ request }
      />
      <Button title="결제하기" onPress={() => money()}></Button>
    </ScrollView>
  )
}

export default OrderNow
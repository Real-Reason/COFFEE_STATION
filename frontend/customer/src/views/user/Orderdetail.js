import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Orderdetail = ({ route }) => {

  const [myOrderDetail, setMyOrderDetail] = useState({})

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getOrderDetail = async() => {
    console.log(`주문상세: 주문id : ${ route.params }`);
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/orders/${route.params}`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      setMyOrderDetail(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <View>
        <Text>Orderdetail</Text>
        <Text>{ myOrderDetail.date }</Text>
        <Text>{ myOrderDetail.request }</Text>
        <Text>{ myOrderDetail.shopName }</Text>
        <Text>{ myOrderDetail.totalPrice }</Text>
      </View>
  );
}

export default Orderdetail;
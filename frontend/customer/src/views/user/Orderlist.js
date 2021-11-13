import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orderdetail from './Orderdetail';


const Stack = createNativeStackNavigator();

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;
const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #f5fcff;
`;

const Orderlist = ({ navigation }) => {

  const [myOrderList, setMyOrderList] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async() => {
    console.log('주문 목록 가져오기');
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/orders`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      setMyOrderList(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const goOrderDetail = (orderId) => {
    console.log('주문 상세 ㄱㄱ');
    navigation.navigate('Orderdetail', orderId);
  }

  return (
      <ScrollContainer>
        <Text>Orderlist</Text>
        {myOrderList.map((myOrder, index) => (
          <Pressable key={index} onPress={() => goOrderDetail(5)}>
            <Text>{ myOrder.date }</Text>
            <Text>{ myOrder.shopName }</Text>
            <Text>{ myOrder.totalPrice }</Text>
            <Text>{ myOrder.status }</Text>
            <Text></Text>
          </Pressable>
        ))}
      </ScrollContainer>
  );
}

const Order = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Orderlist" component={Orderlist} />
      <Stack.Screen name="Orderdetail" component={Orderdetail} />
    </Stack.Navigator>
  );
}



export default Order;
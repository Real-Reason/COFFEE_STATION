import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';


const PayEndView = styled.View`
  align-items: center;
  justify-content: center;
  background: #ffffff;
  height: 100%;
`;


const Payend = ({ navigation, route }) => {

  useEffect(() => {
    console.log(route.params);
    endKakaopay();
  }, []);

  const endKakaopay = async() => {
    console.log('결제 완료');
    // console.log(paydata);
    // console.log(spl[1]);
    try {
      const response2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/orders/${route.params.orderId}/paid`, 
      );
      console.log(response2);
    } catch (e) {
      console.log(e);
    }
  }

  const goMain = () => {
    navigation.navigate('MainScreen');
  }

  return (
      <PayEndView>

        <Image 
          source={require('../../assets/icons/coffee-active.png')} 
          style={{width:200, height: 200 }}
        />

        <Text>주문이 완료되었습니다!</Text>
        <Text>{ route.params.orderTime }</Text>
        {/* <Text>{ pg }</Text> */}
        <Button title="돌아가기" onPress={() => goMain()}></Button>
      </PayEndView>
  );
}

export default Payend;
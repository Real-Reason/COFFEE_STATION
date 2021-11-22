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


const Paying = ({ navigation, route }) => {

  const [pg, setpg] = useState('');

  useEffect(() => {
    console.log(route.params);
    payConfirm();
  }, []);

  const payConfirm = async() => {
    console.log('결제 진행 거의 끝');
    const spl = route.params.payMessage.url.split('=');
    setpg(spl[1]);
    const paydata = route.params.payComplete
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}kakaoPay/approval?pg_token=${spl[1]}`, 
        paydata,
      );
      // console.log(response);
      console.log('전체', response.config.data);
      let datas = JSON.parse(response.config.data);
      console.log(typeof(datas));
      navigation.navigate('Payend', {orderId: datas.partner_order_id, orderTime: response.headers.date})
    } catch (e) {
      console.log(e);
    }
  }




  return (
    <PayEndView>

    <Image 
      source={require('../../assets/icons/coffee-active.png')} 
      style={{width:200, height: 200 }}
    />

    <Text>주문중....</Text>
  </PayEndView>
  );
}

export default Paying;
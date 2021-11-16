import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';


const Payend = ({ navigation, route }) => {

  const [pg, setpg] = useState('');
  const [orderTime, setOrderTime] = useState('');

  useEffect(() => {
    console.log(route.params);
    payConfirm();
  }, []);

  const payConfirm = async() => {
    console.log('결제 찐막');
    const spl = route.params.payMessage.url.split('=');
    setpg(spl[1]);
    const paydata = route.params.payComplete
    // console.log(paydata);
    // console.log(spl[1]);
    let orderId = 0
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}kakaoPay/approval?pg_token=${spl[1]}`, 
        paydata,
      );
      // console.log(response);
      console.log('전체', response.config.data);
      let datas = JSON.parse(response.config.data);
      console.log(typeof(datas));
      orderId = datas.partner_order_id;
      setOrderTime(response.headers.date);
    } catch (e) {
      console.log(e);
    }
    try {
      const response2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/orders/${orderId}/paid`, 
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
      <View>
        <Text>주문이 완료되었습니다!</Text>
        <Text>{ orderTime }</Text>
        <Text>{ pg }</Text>
        <Button title="돌아가기" onPress={() => goMain()}></Button>
      </View>
  );
}

export default Payend;
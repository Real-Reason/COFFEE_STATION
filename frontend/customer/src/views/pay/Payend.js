import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';


const Payend = ({ route }) => {

  const [pg, setpg] = useState('')

  useEffect(() => {
    console.log(route.params);
    // payConfirm();
  }, []);

  const payConfirm = async() => {
    console.log('결제 찐막');
    const spl = route.params.url.split('=');
    setpg(spl[1]);
    const paydata = {
      cid: '',
      tid: '',
      partner_order_id: '',
      partner_user_id: '',
    }
    try {
      const response = await axios.post(
        `http://3.38.99.110:8080/kakaoPay/approval?pg_token=${pg}`, 
        paydata,
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <View>
        <Text>Payend</Text>
        <Text>{ pg }</Text>
      </View>
  );
}

export default Payend;
import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';
const NewOrder = () => {
  const showOrderList = async () => {
    try {
      const response = await axios.get(
        'http://3.38.99.110:8080/api/partner/shop/orders/today/status/ORDERED',
      );
      // console.log(axios.defaults.headers.common);
      console.log('신규정보 받아D옴', response.data);
    } catch (e) {
      console.log('신규 정보 z못받SD아옴', e);
    }
  };

  useEffect(() => {
    showOrderList();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
      }}>
      <Text>NewOrderzzzzzzzzzzzzzzzzzzzzzzzzzz</Text>
    </View>
  );
};

export default NewOrder;

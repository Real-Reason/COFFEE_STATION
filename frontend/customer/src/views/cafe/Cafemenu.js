import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const Cafemenu = ({ route }) => {

  useEffect(() => {
    console.log(' cafe menu mount');
    console.log(route.params);
    setCafeMenu();
    return () => console.log(' cafe menu Unmount');
  }, []);

  const setCafeMenu = async() => {
    console.log('get Cafe Menu');
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/customer/shop/${route.params.id}/menu/${route.params.menuId}`);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }

  }


  return (
      <View>
        <Text>Cafemenu</Text>
      </View>
  );
}

export default Cafemenu;
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const MainScreen = () => {
  const [cafeList, setCafeList] = useState('')

  const getInfo = () => {
    console.log('get카페리스트')
    // try {
    //   const response = axios.get('http://10.0.2.2:8080/api/customer/cafes');
    //   console.log(response);
    // }
    // catch (e) {
    //   console.logg(e);
    // }
  }

  useEffect(() => {
    console.log(' main screen mount');
    getInfo();
    return () => console.log('main screen Unmount');
  }, []);

  return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>MainScreen</Text>
      </View>
  );
}

export default MainScreen;
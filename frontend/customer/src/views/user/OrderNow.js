import React, { useEffect, useState } from 'react';
import {  Text, Button, ScrollView } from 'react-native';

const OrderNow = ({ route }) => {

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <ScrollView>
      <Text> order </Text>
      <Button title="결제하기"></Button>
    </ScrollView>
  )
}

export default OrderNow
import React, {createContext, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import CompletedOrder from './completedtabs/CompletedOrders';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

// styled components
const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const DeatailContainer = styled(Container)`
  flex-direction: column;
`;

//Context 생성
const TabCompletedContext = createContext();

const Tab = createMaterialTopTabNavigator();

const TabCompleted = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const value = {
    selectedId,
    setSelectedId,
    selectedOrder,
    setSelectedOrder,
    completedOrders,
    setCompletedOrders,
  };

  // PAID 받아오기
  const showCompletedOrderList = async () => {
    try {
      const response = await axios.get(BASE_URL + '/shop/orders');
      setCompletedOrders(response.data);
      console.log('COMPLETED ORDERS RECEIVED');
    } catch (e) {
      console.log('COMPLETED 오더 정보 못받아옴', e);
    }
  };

  useEffect(() => {
    showCompletedOrderList();
  }, []);

  return (
    <TabCompletedContext.Provider value={value}>
      <Container>
        <Tab.Navigator style={{flex: 0.5}}>
          <Tab.Screen name="완료" component={CompletedOrder} />
        </Tab.Navigator>
        <DeatailContainer>
          <Text>주문번호 {selectedOrder.id}</Text>
          <Text>총 {selectedOrder.totalPrice}원</Text>
          <Text>요청사항 : {selectedOrder.request}</Text>
          <Text>주문시간 : {selectedOrder.date}</Text>
        </DeatailContainer>
      </Container>
    </TabCompletedContext.Provider>
  );
};
export {TabCompletedContext};
export default TabCompleted;

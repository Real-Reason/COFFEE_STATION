import React, {useEffect, createContext, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewOrder from './progresstabs/NewOrder';
import OnGoingOrder from './progresstabs/OnGoingOrder';
import styled from 'styled-components/native';
import axios from 'axios';

// styled components
const Container = styled.View`
  flex-direction: row;
  flex: 1;
`;

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

// 신규, 진행중 받아올 변수
let paiedOrders = [];
let preparingOrders = [];

//TP Context 생성
const TabProgressContext = createContext();

// Top Tab 생성
const Tab = createMaterialTopTabNavigator();

const TabProgress = ({navigation}) => {
  // Context
  const [selectedNewId, setSelectedNewId] = useState(null);
  const [progressSelectedId, setProgressSelectedId] = useState(null);
  const [selectedNewOrder, setSelectedNewOrder] = useState([]);
  const value = {
    selectedNewId,
    setSelectedNewId,
    progressSelectedId,
    setProgressSelectedId,
    selectedNewOrder,
    setSelectedNewOrder,
  };
  // PAID 받아오기
  const showPaidOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/ORDERED',
      );
      paiedOrders = response.data;
      console.log(paiedOrders);
      console.log('PAID ORDERS RECEIVED');
    } catch (e) {
      console.log('신규 정보 못받아옴', e);
    }
  };
  // PREPARING 받아오기
  const showPreparingOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/PREPARING',
      );
      preparingOrders = response.data;
      console.log(preparingOrders);
      console.log('PREPARING ORDERS RECEIVED');
    } catch (e) {
      console.log('신규 정보 못받아옴', e);
    }
  };
  // Mount 될 때 정보를 받아온다 But 이렇게하면 동시성 처리가 될까?
  useEffect(() => {
    showPaidOrderList();
    showPreparingOrderList();
    return () => console.log('TAB PROGRESS UNMOUNTED!!!');
  }, []);
  // selectedNewId가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedNewId가 변했다!! -> ${selectedNewId}`);
  }, [selectedNewId]);
  // selectedNewOrder가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedNewOrder가 변했다!! -> ${selectedNewOrder}`);
  }, [selectedNewOrder]);

  return (
    <TabProgressContext.Provider value={value}>
      <Container>
        <Tab.Navigator style={{flex: 0.5}} initialRouteName="Home">
          <Tab.Screen
            name="신규"
            component={NewOrder}
            initialParams={{DATA: paiedOrders}}
          />
          <Tab.Screen
            name="진행중"
            component={OnGoingOrder}
            initialParams={{DATA: preparingOrders}}
          />
        </Tab.Navigator>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{selectedNewOrder.id}</Text>
        </View>
      </Container>
    </TabProgressContext.Provider>
  );
};

export {TabProgressContext};
export default TabProgress;

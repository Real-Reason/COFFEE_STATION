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
  justify-content: center;
  align-items: center;
`;
const DeatailContainer = styled(Container)`
  flex-direction: column;
`;
const StyledBtn = styled.Button`
  background-color: red;
`;

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

// 신규, 진행중 받아올 변수
// let paiedOrders = [];
// let preparingOrders = [];

//TP Context 생성
const TabProgressContext = createContext();

// Top Tab 생성
const Tab = createMaterialTopTabNavigator();

const TabProgress = ({navigation}) => {
  // Context
  const [paiedOrders, setPaiedOrders] = useState([]);
  const [preparingOrders, setPreparingOrders] = useState([]);
  const [selectedNewId, setSelectedNewId] = useState(null);
  const [selectedPreparingId, setSelectedPreparingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const value = {
    selectedNewId,
    setSelectedNewId,
    selectedPreparingId,
    setSelectedPreparingId,
    selectedOrder,
    setSelectedOrder,
    paiedOrders,
    setPaiedOrders,
    preparingOrders,
    setPreparingOrders,
  };
  // PAID 받아오기
  const showPaidOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/PAID',
      );
      // paiedOrders = response.data;
      setPaiedOrders(response.data);
      console.log('PAID ORDERS RECEIVED');
    } catch (e) {
      console.log('신규 오더 정보 못받아옴', e);
    }
  };
  // PREPARING 받아오기
  const showPreparingOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/PREPARING',
      );
      // preparingOrders = response.data;
      setPreparingOrders(response.data);
      console.log('PREPARING ORDERS RECEIVED');
    } catch (e) {
      console.log('준비 오더 정보 못받아옴', e);
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
  // selectedPreparingId가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedPreparingId가 변했다!! -> ${selectedPreparingId}`);
  }, [selectedPreparingId]);
  // selectedOrder가 변경되면 호출되게 해보자
  useEffect(() => {
    console.log(`selectedNewOrder가 변했다!! -> ${selectedOrder}`);
  }, [selectedOrder]);

  // 접수 처리
  const acceptOrder = async () => {
    const data = {status: 'PREPARING'};
    try {
      await axios.patch(
        BASE_URL + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
      showPreparingOrderList();
    } catch (e) {
      console.log(e);
    }
  };
  // 완료 처리
  const completeOrder = async () => {
    const data = {status: 'COMPLETED'};
    try {
      await axios.patch(
        BASE_URL + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
      showPreparingOrderList();
    } catch (e) {
      console.log(e);
    }
  };
  // 취소 처리
  const rejectOrder = async () => {
    const data = {status: 'REJECT'};
    try {
      await axios.patch(
        BASE_URL + `/shop/orders/${selectedOrder.orderId}/status`,
        data,
      );
      showPaidOrderList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TabProgressContext.Provider value={value}>
      <Container>
        <Tab.Navigator style={{flex: 0.5}} initialRouteName="Home">
          <Tab.Screen name="신규" component={NewOrder} />
          <Tab.Screen name="진행중" component={OnGoingOrder} />
        </Tab.Navigator>
        <DeatailContainer>
          <Text>주문번호 {selectedOrder.orderId}</Text>
          <Text>/주문내역 {JSON.stringify(selectedOrder.menus)}/</Text>
          <Text>총 {selectedOrder.totalPrice}원</Text>
          <StyledBtn title="취소" onPress={() => rejectOrder()}></StyledBtn>
          <StyledBtn
            title={selectedOrder.status === 'PAID' ? '접수' : '완료 처리'}
            onPress={() => {
              selectedOrder.status === 'PAID' ? acceptOrder() : completeOrder();
            }}></StyledBtn>
          <Text>요청사항 : {selectedOrder.request}</Text>
          <Text>주문시간 : {selectedOrder.date}</Text>
          <Text>접수번호 : {selectedOrder.id}</Text>
        </DeatailContainer>
      </Container>
    </TabProgressContext.Provider>
  );
};

export {TabProgressContext};
export default TabProgress;

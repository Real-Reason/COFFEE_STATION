import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orderdetail from './Orderdetail';
import { format } from "date-fns";

const Stack = createNativeStackNavigator();

const Pressable = styled.Pressable`
  height: 25%;
`
const StView = styled.View`
  /* flex: 1; */
  /* justify-content: flex-start; */
  padding: 15px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: #f5fcff;
  margin-bottom: 5px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding-top: 50px;
`;

const Text = styled.Text`
  flex: 1;
  font-family: 'InfinitySansR';
  align-self: flex-end;
  font-size: 13px;
  text-align: right;
`

const DateText = styled(Text)`
  font-size: 10px;
  text-align: right;
`
const TitleText = styled(Text)`
  text-align: left;
  font-size: 13px;
  font-weight: bold;
  align-self: flex-start;
`
const StatusText = styled(Text)`
  
  font-size: 10px;
  padding: 2px;
  background-color: #FF7F00;
  border-radius: 5px;
  border: solid #cacaca 1px;
  color: white;
  align-self: flex-start;
  text-align: center;
`
const Row = styled.View`
  flex-direction: row;
`

const Col1 = styled.View`
  flex-direction: column;
  width: 30%;
`

const Col2 = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 70%;
`

const Image = styled.Image`
  align-items: center;
  margin: 5px;
`
const Orderlist = ({ navigation }) => {

  const [myOrderList, setMyOrderList] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async() => {
    console.log('주문 목록 가져오기');
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/orders`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      setMyOrderList(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const goOrderDetail = (orderId) => {
    navigation.navigate('Orderdetail', orderId);
  }

  return (
      <ScrollContainer>
        {myOrderList.map((myOrder, index) => (
          <StView key={ index }>
            <Pressable onPress={() => goOrderDetail(myOrder.orderId)}>
              <Row>
                <Col1>
                  <Image
                    style={{width: 50, height: 50}}
                    source={require('../../assets/icons/coffee-active.png')}
                  />
                </Col1>
                <Col2>
                  <Row>
                    <StatusText 
                      value={ myOrder.status } 
                      style={{backgroundColor: myOrder.status == 'COMPLETED'? 'green': 
                      (myOrder.status == 'ORDERED'?'#FF7F00': 'grey') 
                    }}
                    >
                      { myOrder.status }
                    </StatusText>
                    <DateText>{ myOrder.date.slice(0, 10) }</DateText>
                  </Row>
                  <Row>
                    <TitleText>{ myOrder.shopName }</TitleText>
                    <Text>{ myOrder.totalPrice }원</Text>
                  </Row>
                </Col2>
              </Row>
            </Pressable>
          </StView>
        ))}
      </ScrollContainer>
  );
}

const Order = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Orderlist" 
        component={Orderlist} 
        options = {{ title: ' 주문 내역' }}
      />
      <Stack.Screen 
        name="Orderdetail" 
        component={Orderdetail} 
        options = {{ title: ' 주문 내역 상세' }}
      />
    </Stack.Navigator>
  );
}



export default Order;
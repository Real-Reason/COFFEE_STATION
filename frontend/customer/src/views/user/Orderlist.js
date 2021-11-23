import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Orderdetail from './Orderdetail';
import { View, RefreshControl } from 'react-native';
import { MenuToCartContext } from '../Main';

const Stack = createNativeStackNavigator();

const TouchableOpacity = styled.TouchableOpacity`
  /* height: 25%; */

`
const StView = styled.View`
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
  border: #cacaca 0.2px;
  width: 100%;
  margin-bottom: 5px;
`;

const ScrollContainer = styled.ScrollView`
  /* flex: 1; */
  background-color: #ffffff;
  /* height: 100%; */
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
  margin-top : 10px;
`
const TitleText = styled(Text)`
  color: black;
  font-family: 'InfinitySans-Bold';
  text-align: left;
  font-size: 16px;
  align-self: flex-start;
  margin-top: 5px;
`
const StatusText = styled(Text)`
  font-size: 9px;
  padding: 3px;
  margin-bottom: 3px;
  align-self: flex-start;
  border-radius: 20px;
  border: solid #cacaca 0.5px;
  color: white;
  padding-right: 4px;
`
const PriceText = styled(Text)`
  margin-top : 10px;
`

const StatusView = styled.View`
  margin-top: 10px;
`

const Row = styled.View`
  flex-direction: row;
`

const Col1 = styled.View`
  flex-direction: column;
  width: 30%;
`

const Col2 = styled.View`
  justify-content: center;
  flex-direction: column;
  width: 50%;
`

const Col3 = styled.View`
  flex-direction: column;
  width: 20%;
`

const Image = styled.Image`
  align-items: center;
  border-radius: 30px;
  width: 60px;
  height: 60px;
`
const Orderlist = ({ navigation }) => {

  // const [myOrderList, setMyOrderList] = useState([]);
  const { myOrderList, setMyOrderList } = useContext(MenuToCartContext);
  
  useEffect(() => {
    getOrder();
  }, []);
  
  const getOrder = async() => {
    console.log('주문 목록 가져오기');
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/orders`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log('========주문리스트임=======');
      console.log(response.data);
      setMyOrderList(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const goOrderDetail = (orderId) => {
    navigation.navigate('Orderdetail', orderId);
  }

  const [refreshing, setRefreshing] = useState(false);

  return (
      <ScrollContainer
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getOrder}
          />
        }>
        {myOrderList.map((myOrder, index) => (
          <StView key={ index }>
            <TouchableOpacity
              onPress={() => goOrderDetail(myOrder.orderId)}>
              <Row>
                <Col1>
                  <Image
                    source={{ uri: myOrder.shopImgUrl }}
                  />
                </Col1>
                <Col2>
                  <StatusView>
                    <StatusText 
                      value={ myOrder.status } 
                      style={{ backgroundColor: myOrder.status == 'COMPLETED'? '#0788FA': 
                      (myOrder.status == 'ORDERED'?'#6C00FF': 
                      (myOrder.status=='PAID'? '#FF7F00': 
                      (myOrder.status=='PREPARING'? '#00AF60':
                      (myOrder.status=='READY'? '#FF0880':'grey'))))
                      }}
                    >
                      { myOrder.status }
                    </StatusText>
                  </StatusView>
                  <TitleText>{ myOrder.shopName }</TitleText>
                </Col2>
                <Col3>
                  <DateText>{ myOrder.date.slice(0, 10) }</DateText>
                  <PriceText>{ myOrder.totalPrice }원</PriceText>
                </Col3>
              </Row>
            </TouchableOpacity>
          </StView>
        ))}
        <View><Text style={{height: 10, color: '#ffffff'}}>dd</Text></View>
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
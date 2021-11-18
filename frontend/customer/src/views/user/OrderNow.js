import React, { useEffect, useState } from 'react';
import {  Text, Button, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Row = styled.View`
  flex-direction: row;
  padding: 15px;
  padding: ${props => props.extra ? "0px" : "15px"};
  margin-bottom: 5px;
  background-color: white;
`

const Col1 = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 25%;

  /* border: 1px;
  border-color: orange; */
`

const Col2 = styled.View`
  flex-direction: column;
  width: 70%;

  /* border: 1px; */
`

const Image = styled.Image`
  align-items: center;
  align-self: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
`

const StText = styled.Text`
  padding: ${props => props.pay ? "7px" : "3px"};
  text-align: ${props => props.pay ? "center" : "left"};
  font-size: ${props => props.title ? "15px" : props.pay? "15px" : "12px"};
  font-family: ${props => props.title ? "InfinitySans-Bold": "InfinitySansR"};
  color: ${props => props.extra ? "#707070" : props.pay? "white" : "black"};

  /* border: 1px;
  border-color: red; */
`
const StPayView = styled.View`
  width: 90%;
  margin-top: 20px;
  margin-left: 5%;
  border-radius: 20px;
  background-color: #FF7F00;
`


const OrderNow = ({ navigation, route }) => {

  const [orderItems, setOrderItems] = useState([]);
  const [request, onChangeText] = useState('');

  useEffect(() => {
    console.log(route.params);
    setOrderItems(route.params);
  }, []);

  const money = async() => {
    console.log('오더용으로 다시 구조 만들어');
    let orderMenuList = [];
    let tmp = {};
    let cafeidtmp = 0;
    console.log('오더 아이템즈=',orderItems);
    orderItems.forEach((ele, index) => {
      tmp = { menuId: ele.item.id, extraIdList: ele.extraIdList, menuSizeId: ele.menuSizeId, quantity: ele.count };
      console.log('id', ele.item.id);
      orderMenuList.push(tmp);
      cafeidtmp = ele.cafeId;
    })
    const data = {orderMenuList, request};
    console.log('데이타임!=====', data);
    let JWTToken = await AsyncStorage.getItem('userToken');
    let orderCheck = {};
    console.log('카페아이디 템프',cafeidtmp);
    console.log('오더 메뉴 리스트',orderMenuList);
    console.log('파람즈',route.params);
    try {
      console.log('try 시작')
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/customer/shop/${cafeidtmp}/order`, 
        data,
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log('오더인포 ',response.data);
      orderCheck = {
        orderInfo: response.data, 
        cafeId: orderItems[0].cafeId, 
        orderItem: orderItems[0].item.name, 
        orderItemCount: orderItems.length}
    } catch (e) {
      console.log(e);
    }
    
    console.log('kakaopay READY');
    const paydata = {
      "cid" : "TC0ONETIME",
      "partner_order_id" : orderCheck.orderInfo.id,
      "partner_user_id" : orderCheck.cafeId,
      "item_name" : `${orderCheck.orderItem} 외 ${orderCheck.orderItemCount} 건`,
      "quantity" : "1",
      "total_amount" : `${orderCheck.orderInfo.totalPrice}`,
      "tax_free_amount" : "0",
      "approval_url" : "http://localhost:8080/api/test/kakaoPaySuccess",
      "cancel_url" : "http://localhost:8080/kakaoPayCancel",
      "fail_url" : "http://localhost:8080/kakaoPaySuccessFail"
    };
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}kakaoPay/ready`, 
        paydata,
      );
      console.log(response.data);
      const payInfo = {
        paysuccess: response.data, 
        partner_order_id: orderCheck.orderInfo.id, 
        partner_user_id: orderCheck.cafeId
      }
      navigation.navigate('Paystart', payInfo);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView>
      {orderItems.map((items, index) => (
        <Row key={index}>
          <Col1>
            <Image source={{uri : items.item.imgUrl}}></Image>
          </Col1>
          <Col2>
            <StText title>
              { items.item.name }
            </StText>
            <Row extra>
              <StText extra>
                옵션 선택 :
              </StText>
              {items.extraName.map((extraName, index) => (
                <StText extra key={index}>
                  {extraName} |
                </StText>
              ))}
              <StText extra>{items.addPrice}원</StText>
            </Row>
            <StText>
              수량 : { items.count }
            </StText>
            <StText style={{textAlign: "right", fontSize: 14}}>
              { items.item.price + items.addPrice } 원
            </StText>
          </Col2>
        </Row>
      ))}

      <Row>
        <Col2>
          <StText title>요청사항</StText>
          <TextInput onChangeText={ onChangeText } value={ request } placeholder="주문 요청사항을 입력해주세요."/>        
        </Col2>
      </Row>
      
      <TouchableOpacity onPress={() => money()}>
        <StPayView>
          <StText pay>결제하기</StText>
        </StPayView>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default OrderNow
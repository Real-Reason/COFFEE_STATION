import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styled from 'styled-components/native';


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
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #ffffff;
  /* height: 100%; */
`;


const Row = styled.View`
  flex-direction: row;
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
  border: #cacaca 0.2px;
  width: 100%;
  margin-bottom: 5px;
`

const Col1 = styled.View`
  flex-direction: column;
  width: 100%;
  background-color: #FFEDDC;
  padding: 20px;
`

const Col2 = styled.View`
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const Col3 = styled.View`
  flex-direction: column;
  width: 70%;
`

const Col4 = styled.View`
  flex-direction: column;
  width: 30%;
`
const Half = styled.View`
  flex-direction: column;
  width: 50%;
`

const Image = styled.Image`
  align-items: center;
  border-radius: 30px;
  width: 60px;
  height: 60px;
`

const Text = styled.Text`
  flex: 1;
  font-family: 'InfinitySansR';
  font-size: 13px;
  align-self: flex-end;
`

const DateText = styled(Text)`
text-align: right;
`

const TitleText = styled(Text)`
  font-family: 'InfinitySans-Bold';
  font-size: 16px;
  align-self: center;
  margin-top: 5px;
  padding-bottom: 20px;
`
const PriceText = styled(Text)`
  font-family: 'InfinitySans-Bold';
  font-size: 16px;
  margin-top: 5px;
`
const RequestText = styled(Text)`
  margin-top: 3px;
  align-self: flex-start;
`
const SubText = styled(Text)`
`

const Orderdetail = ({ route }) => {

  const [myOrderDetail, setMyOrderDetail] = useState({});
  const [myOrderDetailMenus, setmyOrderDetailMenus] = useState([]);
  const [myDate, setMyDate] = useState('');
  const [myTime, setMyTime] = useState('');

  useEffect(() => {
    getOrderDetail();
  }, []);

  const getOrderDetail = async() => {
    console.log(`주문상세: 주문id : ${ route.params }`);
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/orders/${route.params}`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      setMyOrderDetail(response.data);
      setmyOrderDetailMenus(response.data.menus)
      setMyDate(response.data.date.slice(0, 10))
      setMyTime(response.data.date.slice(11, 16))
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <ScrollContainer>
        <TitleText>{ myOrderDetail.shopName }</TitleText>
        <Col1>
          <DateText>{ myDate } { myTime }</DateText>
          <Text style={{ alignSelf: 'flex-start', fontFamily: 'InfinitySans-Bold'}}>요청사항</Text>
          <RequestText>{ myOrderDetail.request }</RequestText>
          <PriceText>총 { myOrderDetail.totalPrice }원</PriceText>
        </Col1>
        <Col2>

        {myOrderDetailMenus.map((menu, index) => (
          <Row key={ index }>
            <Col3>
              <Text style={{ fontFamily: 'InfinitySans-Bold', fontSize: 15, alignSelf: 'flex-start'}}>
                { menu.menuName }<Text>({ menu.menuSize })</Text>
              </Text>
              <SubText>  { menu.price }원</SubText>
              {menu.extras.map((extra, extraIndex) => (
                <Col2 key={ extraIndex }>
                  <SubText style={{ alignSelf: 'flex-start' }}>{ extra.name } +{ extra.price }원</SubText>
                </Col2>
              ))}
            </Col3>
            <Col4>
              <Text> × { menu.quantity }</Text>
            </Col4>
          </Row>
        ))}
        </Col2>

      </ScrollContainer>
  );
}

export default Orderdetail;
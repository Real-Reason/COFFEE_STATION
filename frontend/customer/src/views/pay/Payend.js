import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Image, Pressable } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuToCartContext } from '../Main';


const ScrollContainer = styled.ScrollView`
  /* flex: 1; */
  padding-top: 20px;
  /* padding-bottom: 100px; */
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

const MyText = styled.Text`
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
  font-size: 25px;
  margin-top: 5px;
  margin-left: 5%;
  /* text-align: center; */
  margin-right: 5px;
  margin-bottom: 18px;
  color: black;
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

const QuantityText = styled(Text)`
  padding-top: 13px;
  font-size: 20px;
  justify-content: center;
`
const StPressable = styled.TouchableOpacity`
  flex-direction: row;
  align-self: center;
  border-radius: 5px;
  border: solid #FF7F00 0.5px;
  padding: 3px;
  padding-left: 8px;
  padding-right: 0;
  margin-bottom: 10px;
`


const Payend = ({ navigation, route }) => {

  const [myOrderDetail, setMyOrderDetail] = useState({});
  const [myOrderDetailMenus, setmyOrderDetailMenus] = useState([]);
  const [myDate, setMyDate] = useState('');
  const [myTime, setMyTime] = useState('');

  const { setIsCart, setCartListItems, setShopName } = useContext(MenuToCartContext);

  useEffect(() => {
    console.log(route.params);
    endKakaopay();
  }, []);

  const endKakaopay = async() => {
    console.log('결제 완료');
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/orders/${route.params.orderId}/paid`, 
      );
      console.log(response2);
    } catch (e) {
      console.log(e);
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/orders/${route.params.orderId}`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log('주문내역');
      console.log(response.data);
      setMyOrderDetail(response.data);
      setmyOrderDetailMenus(response.data.menus);
      setMyDate(response.data.date.slice(0, 10));
      setMyTime(response.data.date.slice(11, 16));
    } catch (e) {
      console.log(e);
    }
    setIsCart(false);
    setCartListItems([]);
    setShopName('');
    await AsyncStorage.removeItem('cartList');
  }

  const goMain = () => {
    navigation.navigate('MainScreen');
  }

  return (
    <ScrollContainer>
    <View style={{flexDirection: 'row'}}>
      <View>
        <TitleText>주문이 완료되었습니다!!</TitleText>
      </View>
    </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <TitleText>{ myOrderDetail.shopName }</TitleText>
        </View>
      </View>

      <Col1 style={{marginBottom: 5}}>
        <DateText>{ myDate } { myTime }</DateText>
        <MyText style={{ alignSelf: 'flex-start', fontFamily: 'InfinitySans-Bold'}}>요청사항</MyText>
        <RequestText>{ myOrderDetail.request }</RequestText>
        <PriceText>총 { myOrderDetail.totalPrice }원</PriceText>
      </Col1>

      <Col2>
        {myOrderDetailMenus.map((menu, index) => (
          <Row key={ index }>
            <Col3>
              <MyText style={{ fontFamily: 'InfinitySans-Bold', fontSize: 15, alignSelf: 'flex-start'}}>
                { menu.menuName }<MyText>({ menu.menuSize })</MyText>
              </MyText>
              <SubText>  { menu.price }원</SubText>
              {menu.extras.map((extra, extraIndex) => (
                <Col2 key={ extraIndex }>
                  <SubText style={{ alignSelf: 'flex-start' }}>{ extra.name } +{ extra.price }원</SubText>
                </Col2>
              ))}
            </Col3>
            <Col4>
              <QuantityText> × { menu.quantity }</QuantityText>
            </Col4>
          </Row>
        ))}
      </Col2>
      <Pressable onPress={() => goMain()}>
        <MyText style={{ fontFamily: 'InfinitySans-Bold', fontSize: 15, alignSelf: 'flex-start'}}> 메인으로 돌아가기 </MyText>
      </Pressable>
      <View><MyText style={{height: 1, color: '#ffffff'}}>dd</MyText></View>
    </ScrollContainer>
  );
}

export default Payend;
import React, { useState, useEffect } from 'react';
import { Pressable, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styled from 'styled-components/native';

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

const Image = styled.Image`
  width: 20;
  height: 20;
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

const Orderdetail = ({ route, navigation }) => {

  const [myOrderDetail, setMyOrderDetail] = useState({});
  const [myOrderDetailMenus, setmyOrderDetailMenus] = useState([]);
  const [myDate, setMyDate] = useState('');
  const [myTime, setMyTime] = useState('');
  const [shopId, setShopId] = useState('');
  const [shop, setShop] = useState({
    id: '',
  });
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
      setmyOrderDetailMenus(response.data.menus);
      setMyDate(response.data.date.slice(0, 10));
      setMyTime(response.data.date.slice(11, 16));
      setShopId(response.data.shopId);
      setShop({
        ...shop,
        ['id']: response.data.shopId
      });
    } catch (e) {
      console.log(e);
    }
  }

  const getShop = (shop) => {
    console.log(shopId)
    navigation.navigate('Cafe', shop);
  }

  return (
      <ScrollContainer>
        <View style={{flexDirection: 'row'}}>
          <View>
        <TitleText>{ myOrderDetail.shopName }</TitleText>
        </View>
        <StPressable onPress={() => getShop(shop)}>
          <Image source={ require('../../assets/icons/sign.png') }/>
          <View>
            <SubText style={{ marginTop: 5, marginRight:10, fontSize: 10 }}>카페 상세</SubText>
          </View>
        </StPressable>
        </View>
        <Col1 style={{marginBottom: 5}}>
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
              <QuantityText> × { menu.quantity }</QuantityText>
            </Col4>
          </Row>
        ))}
        </Col2>
        <View><Text style={{height: 1, color: '#ffffff'}}>dd</Text></View>
      </ScrollContainer>
  );
}

export default Orderdetail;
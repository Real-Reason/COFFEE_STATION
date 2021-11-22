import React, { useEffect, useState, useContext } from 'react';
import { RefreshControl, Pressable, Alert, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderNow from './OrderNow';
import Paystart from '../pay/Paystart';
import Paying from '../pay/Paying';
import Payend from '../pay/Payend';
import styled from 'styled-components/native';
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

const TitleText = styled(Text)`
  font-family: 'InfinitySans-Bold';
  font-size: 22px;
  margin-top: 5px;
  margin-left: 5%;
  margin-right: 5px;
  margin-bottom: 18px;
  color: black;
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

const themeColor = '#ff7f00'
const StButton = styled.TouchableOpacity`
  border: ${themeColor};
  margin-bottom: 5px;
  border-radius: 10px;
  width: 45%;
  align-items: center;
`

const StBtnText = styled.Text`
  font-family: 'InfinitySansR';
  padding: 15px;
  color: ${themeColor};
  margin-top: 2.5px;
  margin-bottom: 2.5px;
`

const ScrollView = styled.ScrollView`
  background-color: white;
  padding: 20px;
`

const Stack = createNativeStackNavigator();

const Cart = ({ navigation }) => {

  // const [cartList, setCartList] = useState({'items': []});
  // const [cartListItems, setCartListItems] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  // const [isCart, setIsCart] = useState(false);
  // const [shopName, setShopName] = useState('');

  const {
    cartListItems,
    setCartListItems,
    isCart,
    setIsCart,
    shopName,
    setShopName} = useContext(MenuToCartContext);
  
  useEffect(() => {
    getCartList();
    console.log(cartListItems)
  }, []);

  const getCartList = async() => {
    console.log('장바구니가져와');
    try {
      // const clist = JSON.parse(await AsyncStorage.getItem('cartList'));
      // setCartList(clist);
      // setCartListItems(clist.items);
      // setCartListItems(cartListItems)
      console.log(cartListItems)
      // console.log('카트리스트',cartList);
      // setIsCart(true);
      // setShopName(cartListItems[0].shopName);
    } catch (e) {
      console.log(e);
    }
  }

  const clearCartList = async() => {
    // try{
    await AsyncStorage.removeItem('cartList');
    // } catch (e) {
    //   console.log(e);
    // }
    setIsCart(false);
    setCartListItems([]);
    setShopName('');
  }

  const goOrder = () => {
    navigation.navigate('OrderNow', cartListItems);
  }
  const goHome = () => {
    navigation.navigate('MainScreen');
  }

  const [refreshing, setRefreshing] = useState(false);

  return (
      <ScrollContainer
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCartList} 
          />
        }>
        {
          cartListItems.length > 0
          ?(<View style={{flexDirection: 'row', height: 60 }}>
              <View>
                <TitleText>{ shopName }</TitleText>
              </View>
                <Image style= {{marginTop: 10}}source={ require('../../assets/icons/sign.png') }/>
            </View>)
          : (<TitleText style={{ alignSelf: 'flex-start' }}>비어있습니다.</TitleText>)
        }

        {cartListItems.map((menu, index) => (
          <Row key={ index }>
            <Col3>
              <Text style={{ fontFamily: 'InfinitySans-Bold', fontSize: 15, alignSelf: 'flex-start'}}>
                { menu.item.name }<Text>({ menu.menuSizeName }) {menu.count}개</Text>
              </Text>
              <SubText>  { (menu.item.price + menu.addPrice) * menu.count }원</SubText>
              {menu.extraName.map((extra, extraIndex) => (
                <Col2 key={ extraIndex }>
                  <SubText style={{ alignSelf: 'flex-start' }}>{ extra }</SubText>
                </Col2>
              ))}
            </Col3>
            <Col4>
              <QuantityText> × { menu.count }</QuantityText>
            </Col4>
          </Row>
        ))}
        
        {
        cartListItems.length > 0
        ?(<View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-evenly' }}>
          <StButton onPress={() => goOrder()}>
            <StBtnText>
            주문하기
            </StBtnText>
          </StButton>
          <StButton onPress={() => clearCartList()}>
            <StBtnText>
            비우기
            </StBtnText>
          </StButton>
        </View>)
        :(<StButton onPress={() => goHome()} style={{ alignSelf:'center'}}>
            <StBtnText>
            담으러 가기
            </StBtnText>
          </StButton>)
}
      <View><Text style={{height: 1, color: '#ffffff'}}>dd</Text></View>
      </ScrollContainer>
  );
}


const CartAndOrder = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Cart" 
        component={Cart} 
        options = {{ title: '장바구니' }}
      />
      <Stack.Screen 
      name="OrderNow" 
      component={OrderNow} 
      options = {{ title: '주문하기' }}
      />
      <Stack.Screen 
        name="Paystart" 
        component={Paystart} 
        options = {{ title: '결제 중..' }}
      />
      <Stack.Screen 
        name="Paying" 
        component={Paying} 
        options = {{ title: '결제 중....' }}
      />
      <Stack.Screen 
        name="Payend" 
        component={Payend} 
        options = {{ title: '결제 완료!' }}
      />
    </Stack.Navigator>
  );
}


export default CartAndOrder;
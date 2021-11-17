import React, { useEffect, useState } from 'react';
import { Text,  RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderNow from './OrderNow';
import Paystart from '../pay/Paystart';
import Paying from '../pay/Paying';
import Payend from '../pay/Payend';
import styled from 'styled-components/native';
const themeColor = '#ff7f00'
const StButton = styled.TouchableOpacity`
  border: ${themeColor};
  margin-bottom: 5px;
  border-radius: 10px;
  width: 49.2%;
  align-items: center;
`
const Row = styled.View`
  margin: 10px;
  flex-direction: row;
  height: 60px;
  justify-content: space-between;
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

  const [cartList, setCartList] = useState({'items': []});
  const [cartListItems, setCartListItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [shopName, setShopName] = useState('');

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async() => {
    console.log('장바구니가져와');
    try {
      const clist = JSON.parse(await AsyncStorage.getItem('cartList'));
      setCartList(clist);
      setCartListItems(clist.items);
      // console.log('카트리스트',cartList);
      setIsCart(true);
      setShopName(cartListItems[0].shopName);
    } catch (e) {
      console.log(e);
    }
  }

  const clearCartList = async() => {
    try{
      await AsyncStorage.removeItem('cartList');
    } catch (e) {
      console.log(e);
    }
    setCartList({'items': []});
    setIsCart(false);
    setCartListItems([]);
    setShopName('');
  }

  const goOrder = () => {
    navigation.navigate('OrderNow', cartListItems);
  }

  return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCartList} 
          />
        }
      >
        <Text>고른 메뉴</Text>
        <Text>{ shopName }</Text>
        {/* <Text>{ cartListItems[0].shopName }</Text> */}
        {
          isCart
          ? (<Text></Text>)
          : (<Text>비어있습니다.</Text>)
        }
        {cartListItems.map((cartmenu, index) => (
              <Pressable key={index} onPress={() => alert(index)}>
                <Text>
                  카페: { cartmenu.shopName }, 
                { cartmenu.item.name }, {cartmenu.count}개, 
                { cartmenu.extraName }
                { (cartmenu.item.price + cartmenu.addPrice) * cartmenu.count }원 
                </Text>
              </Pressable>
        ))}
        <Row>
          <StButton title='주문하기' onPress={() => goOrder()}>
            <StBtnText>
            주문하기
            </StBtnText>
          </StButton>
          <StButton title='장바구니 비우기' onPress={() => clearCartList()}>
            <StBtnText>
            장바구니 비우기
            </StBtnText>
          </StButton>
        </Row>
      </ScrollView>
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
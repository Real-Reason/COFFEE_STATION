import React, { useEffect, useState } from 'react';
import { Text, Button, ScrollView, RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderNow from './OrderNow';
import Paystart from '../pay/Paystart';
import Paying from '../pay/Paying';
import Payend from '../pay/Payend';



const Stack = createNativeStackNavigator();

const Cart = ({ navigation }) => {

  const [cartList, setCartList] = useState({'items': []});
  const [cartListItems, setCartListItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = async() => {
    console.log('장바구니가져와');
    try {
      const clist = JSON.parse(await AsyncStorage.getItem('cartList'));
      setCartList(clist);
      setCartListItems(clist.items);
      console.log(cartList);
      setIsCart(true);
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
        <Text>Cart</Text>
        {
          isCart
          ? (<Text></Text>)
          : (<Text>없습니다.</Text>)
        }
        {cartListItems.map((cartmenu, index) => (
              <Pressable key={index} onPress={() => alert(index)}>
                <Text>카페: { cartmenu.shopName }, { cartmenu.item.name }, {cartmenu.count}개, { (cartmenu.item.price + cartmenu.addPrice) * cartmenu.count }원 {cartmenu.extraIdList}</Text>
              </Pressable>
        ))}
        <Button title='주문하기' onPress={() => goOrder()}></Button>
        <Button title='장바구니 비우기' onPress={() => clearCartList()}></Button>
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
import React, { useEffect, useState } from 'react';
import { Text, Button, ScrollView, RefreshControl, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderNow from './OrderNow';
import Paystart from '../pay/Paystart';
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
                <Text> { cartmenu.item.name }, {cartmenu.count}개, { cartmenu.item.price * cartmenu.count }원 {cartmenu.extraIdList}</Text>
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
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="OrderNow" component={OrderNow} />
      <Stack.Screen name="Paystart" component={Paystart} />
      <Stack.Screen name="Payend" component={Payend} />
    </Stack.Navigator>
  );
}


export default CartAndOrder;
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cafemenu = ({ route }) => {

  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log(' cafe menu mount');
    console.log(route.params.id);
    console.log(route.params.menuInfo.menuId);
    setCafeMenu();
    return () => console.log(' cafe menu Unmount!');
  }, []);

  const setCafeMenu = async() => {
    console.log('get Cafe Menu');
    try {
      const response = await axios.get(`http://3.38.99.110:8080/api/customer/shop/${route.params.id}/menu/${route.params.menuInfo.menuId}`);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const addCart = async(item) => {
    console.log('카트에 추가!');
    console.log('넣어야할것 : 가게id, 상품, 개수');
    let tmp = JSON.parse(await AsyncStorage.getItem('cartList'));
    let cartlist = {items: []};
    let isSame = true;
    if (tmp) {
      let cartlistall = tmp.items
      cartlistall.forEach((val, index) => {
        console.log(index);
        if (val.cafeId == route.params.id && val.menuId == route.params.menuInfo.menuId) {
          console.log('중복0');
          val.count = val.count + count;
          isSame = false;
          return false;
        }
      });
      if (isSame) {
        cartlistall.push({cafeId: route.params.id, item, count, menuId: route.params.menuInfo.menuId });
        isSame = true;
      }
      cartlist = {items: cartlistall};
    } else {
      cartlist = {items: [{cafeId: route.params.id, item, count, menuId: route.params.menuInfo.menuId }]}
    }
    await AsyncStorage.setItem('cartList', JSON.stringify(cartlist));
    alert(`장바구니에 ${route.params.menuInfo.name} 추가`);
  }

  const likeMenu = async() => {
    console.log(`${route.params.menuInfo.menuId}번 메뉴 좋아여`);
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `http://3.38.99.110:8080/api/customer/favorites/menu/${route.params.menuInfo.menuId}`, 
        {},
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <View>
        <Image 
          source={{uri: route.params.menuInfo.imgUrl }} 
          style={{width:100, height:100}} 
        />

        <Text>{ route.params.menuInfo.price }</Text>
        <Text>{ route.params.menuInfo.name }</Text>
        <Text>{ route.params.menuInfo.menuStatus }</Text>
        <Button title="-1" onPress={() => setCount(count-1)}></Button>
        <Text>{ count }</Text>
        <Button title="+1" onPress={() => setCount(count+1)}></Button>
        <Button title="장바구니에 추가하기" onPress={() => addCart(route.params.menuInfo)}></Button>
        <Text> </Text>
        <Button title='좋아요~' onPress={() => likeMenu()}></Button>
        
      </View>
  );
}

export default Cafemenu;
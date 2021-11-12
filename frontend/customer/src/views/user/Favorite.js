import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = () => {

  const [likeShopList, setLikeShopList] = useState([]);
  const [likeMenuList, setLikeMenuList] = useState([]);

  useEffect(() => {
    console.log(' favorite mount!');
    getFavorite();
    return () => console.log(' favorite Unmount!');
  }, []);

  const getFavorite = async() => {
    console.log('좋아요 한 메뉴랑 가게 목록 가져오기!');
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/favorites/menu`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      setLikeMenuList(response.data.likeMenuList);
    } catch (e) {
      console.log(e);
    }
    try {
      // 에러가남
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/favorites/shop`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
      setLikeShopList(response.data.likeShopList);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <View>
        <Text>like shop</Text>
        {/* <Text>{ likeShopList }</Text> */}
        <Text>like menu</Text>
        {/* <Text>{ likeMenuList }</Text> */}
      </View>
  );
}

export default Favorite;
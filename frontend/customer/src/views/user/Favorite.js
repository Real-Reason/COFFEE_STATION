import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = () => {

  const [likeShopList, setLikeShopList] = useState([]);
  const [likeMenuList, setLikeMenuList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log(' favorite mount');
    getFavorite();
    return () => console.log(' favorite Unmount!');
  }, []);

  const getFavorite = async() => {
    console.log('좋아요 한 메뉴랑 가게 목록 가져오기');
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getFavorite} 
          />
        }
      >
        <Text>like menu</Text>
        {likeMenuList.map((likeMenu, index) => (
          <Pressable key={index}>
            <Text>{ likeMenu.menu.name }</Text>
          </Pressable> 
        ))}
        <Text>like shop</Text>
        {likeShopList.map((likeShop, index) => (
          <Pressable key={index}>
            <Text>{ likeShop.shop.name }</Text>
          </Pressable> 
        ))}
      </ScrollView>
  );
}

export default Favorite;
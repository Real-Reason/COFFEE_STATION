import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorite = ({ navigation }) => {

  const [likeShopList, setLikeShopList] = useState([]);
  const [likeMenuList, setLikeMenuList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log(' favorite mount');
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

  const goFavoriteCafeDetail = (likeShop) => {
    console.log('단골 가게로 가자');
    console.log(likeShop);
    navigation.navigate('Cafe', likeShop.shop);
  }

  const goFavoriteDrink = (likeMenu) => {
    console.log('좋아하는 음료 가자');
    console.log(likeMenu);
    navigation.navigate('Cafemenu', {menuInfo: likeMenu.menu, id: likeMenu.menu.shopId });
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
        <Text>like shop</Text>
        {likeShopList.map((likeShop, index) => (
          <Pressable key={index} onPress={() => goFavoriteCafeDetail(likeShop)}>
            <Text>{ likeShop.shop.name }</Text>
          </Pressable>
        ))}
        <Text>like menu</Text>
        {likeMenuList.map((likeMenu, index) => (
          <Pressable key={index} onPress={() => goFavoriteDrink(likeMenu)}>
            <Text>{ likeMenu.menu.name }</Text>
          </Pressable> 
        ))}
      </ScrollView>
  );
}

export default Favorite;
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, ScrollView, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MenuToCartContext } from '../Main';
// import TabBarTop from '@react-navigation/material-top-tabs/lib/typescript/src/views/MaterialTopTabBar';

const Row = styled.View`
  flex-direction: row;
  padding: 15px;
  margin-bottom: 5px;
  background-color: white;
`

const Col1 = styled.View`
  flex-direction: column;
  justify-content: center;
  width: 30%;
/* 
  border: 1px;
  border-color: orange; */
`

const Col2 = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: ${props => props.shop ? "60%" : "50%"};

  /* border: 1px;
  border-color: red; */
`

const Col3 = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  /* border: 1px; */
`

const Image = styled.Image`
  align-items: center;
  align-self: center;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  /* border: 1px; */
  /* border-color: #cacaca; */
  `

const StyledCafeItem = styled.Text`
  padding: 5px;
  font-size: ${props => props.title ? "16px" : "13px"};
  font-family: ${props => props.title ? "InfinitySans-Bold": "InfinitySansR"};
  color: ${props => props.distance ? "white" : "black"};
  `;

const StLengthText = styled.Text`
  padding: 10px;
  font-size: 14px;
  font-family: "InfinitySansR";
  color: black;
`
const StMenuStatusText = styled.Text`
  text-align: center;
  font-size: 12px;
  font-family: "InfinitySansR";
  color: white;
  `

const StMenuStatus = styled.View`
  padding: 5px;
  width: 100%;
  border-radius: 20px;
  background-color: orange;
`



const Tab = createMaterialTopTabNavigator();

const Favorite = ({ navigation }) => {

  // const [likeShopList, setLikeShopList] = useState([]);
  // const [likeMenuList, setLikeMenuList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const {likeShopList, setLikeShopList, likeMenuList, setLikeMenuList} = useContext(MenuToCartContext);

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
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/menu`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log('찜메뉴 ======= ', response.data.likeMenuList);
      setLikeMenuList(response.data.likeMenuList);

    } catch (e) {
      console.log(e);
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/shop`, 
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log('찜가게 ======= ',response.data.likeShopList);
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

  function LikeShop() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getFavorite} 
          />
        }>
        <StLengthText>총 {likeShopList.length}개</StLengthText>
        {likeShopList.map((likeShop, index) => (
          <Row key={index}>
            <Col1>
              <Image source={{uri : likeShop.shop.shopImgUrl}}></Image>
            </Col1>
            <Col2 shop>
              <Pressable  onPress={() => goFavoriteCafeDetail(likeShop)}>
                <StyledCafeItem title>{ likeShop.shop.name }</StyledCafeItem>
                <StyledCafeItem>{ likeShop.shop.address }</StyledCafeItem>
              </Pressable>
            </Col2>
          </Row>

        ))}
      </ScrollView>
    )
  }

  function LikeMenu() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getFavorite} 
          />
      }>
        <StLengthText>총 {likeMenuList.length}개</StLengthText>
        {likeMenuList.map((likeMenu, index) => (
          <Row key={index}>
            <Col1>
              <Image source={{uri : likeMenu.menu.imgUrl}}></Image>
            </Col1>
            <Col2>
              <Pressable onPress={() => goFavoriteDrink(likeMenu)}>
                <StyledCafeItem title>{ likeMenu.menu.name }</StyledCafeItem>
                <StyledCafeItem>{ likeMenu.menu.shopName }</StyledCafeItem>
                <StyledCafeItem>{ likeMenu.menu.price }원</StyledCafeItem>
              </Pressable>
            </Col2>
            <Col3>
              <StMenuStatus
              style={{ backgroundColor: likeMenu.menu.menuStatus == "SALE" ? '#00AF60' : 
                      (likeMenu.menu.menuStatus == "SOLD_OUT" ? '#f0c26e' : '#f08a6e')}}>
                <StMenuStatusText>
                  { likeMenu.menu.menuStatus }
                </StMenuStatusText>
              </StMenuStatus>
            </Col3>
          </Row>
        ))}
      </ScrollView>
    )
  }

  return (
    <View style={{height: "100%"}}>
      <Tab.Navigator>
        <Tab.Screen name="cafe" component={LikeShop}></Tab.Screen>
        <Tab.Screen name="menu" component={LikeMenu}></Tab.Screen>
      </Tab.Navigator>
    </View>

  );
}

export default Favorite;
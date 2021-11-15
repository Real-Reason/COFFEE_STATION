import React, { useContext, useEffect } from 'react';
import { Button, Text, Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './cafe/MainScreen'
import Favorite from './user/Favorite'
import CartAndOrder from './user/Cart'
import Order from './user/Orderlist'
import Search from './search/Search';
import { AuthContext } from '../App'

const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, name) => {
  let iconImagePathActive;
  let iconImagePathInActive;
  if(name === 'MainScreen') {
    iconImagePathActive = require('../assets/icons/coffee-active.png')
    iconImagePathInActive = require('../assets/icons/coffee-inactive.png')
  } else if (name === 'Favorite') {
    iconImagePathActive = require('../assets/icons/like-active.png')
    iconImagePathInActive = require('../assets/icons/like-inactive.png')  
  } else if (name === 'CartAndOrder') {
    iconImagePathActive = require('../assets/icons/cart-active.png')
    iconImagePathInActive = require('../assets/icons/cart-inactive.png')  
  } else if (name === 'Order') {
    iconImagePathActive = require('../assets/icons/orderlist-active.png')
    iconImagePathInActive = require('../assets/icons/orderlist-inactive.png')  
  } 
  else if (name === 'Search') {
    iconImagePathActive = require('../assets/icons/search-active.png')
    iconImagePathInActive = require('../assets/icons/search-inactive.png')  
  }

  return (
    <Image
      style={{width: name == 'MainScreen'? 26:24, height: name == 'MainScreen'? 26 : 24}}
      // style={{width: 24, height: 24}}
      source={focused? iconImagePathActive:iconImagePathInActive}
    />
  )
}
const Main = () => {

  useEffect(() => {
    console.log('.');
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({ //각 탭에 그림 삽입 및 선택 효과
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
          padding: 10
        },
        tabBarLabelStyle: {
          paddingBottom: 7,
          fontSize: 13,
          fontFamily: 'InfinitySansR'
        },
        tabBarLabel: route.name,
        tabBarIcon: ({focused})=> (
          TabBarIcon(focused, route.name) // 함수 호출
        ),
        tabBarActiveTintColor: '#FF7F00',
      })}
    >
      <Tab.Screen 
        name="MainScreen" component={MainScreen} 
        options={{ tabBarLabel: 'Home' }} 
      />
      <Tab.Screen 
        name="Favorite" component={Favorite} 
        options={{ tabBarLabel: '즐겨찾기' }} 
      />
      <Tab.Screen 
        name="CartAndOrder" component={CartAndOrder} 
        options={{ tabBarLabel: '카트' }}   
      />
      <Tab.Screen 
        name="Order" component={Order} 
        options={{ tabBarLabel: '주문내역' }} 
      />
      <Tab.Screen 
        name="Search" component={Search} 
        options={{ tabBarLabel: '검색' }} 
      />
    </Tab.Navigator>
  );
}

export default Main;
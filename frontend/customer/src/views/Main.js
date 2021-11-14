import React, { useContext, useEffect } from 'react';
import { Button, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './cafe/MainScreen'
import Favorite from './user/Favorite'
import CartAndOrder from './user/Cart'
import Order from './user/Orderlist'
import Alarm from './Alarm';
import { AuthContext } from '../App'

const Tab = createBottomTabNavigator();

const Main = () => {

  useEffect(() => {
    console.log('.');
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="CartAndOrder" component={CartAndOrder} />
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Alarm" component={Alarm} />
    </Tab.Navigator>
  );
}

export default Main;
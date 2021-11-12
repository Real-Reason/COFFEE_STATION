import React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './cafe/MainScreen'
import Favorite from './user/Favorite'
import CartAndOrder from './user/Cart'
import Orderlist from './user/Orderlist'
import Alarm from './Alarm';

const Tab = createBottomTabNavigator();


const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MainScreen" component={MainScreen} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="CartAndOrder" component={CartAndOrder} />
      <Tab.Screen name="Orderlist" component={Orderlist} />
      <Tab.Screen name="Alarm" component={Alarm} />
    </Tab.Navigator>
  );
}

export default Main;
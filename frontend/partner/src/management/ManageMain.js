import * as React from 'react';
import {useContext, useState, createContext} from 'react';
import {Text, Pressable, View, Button} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../App';
import axios from 'axios';

//Tabs
import TabCompleted from './tabs/TabCompleted';
import TabInfo from './tabs/TabInfo';
import TabMenu from './tabs/TabMenu';
import TabProgress from './tabs/TabProgress';
import TabRevenue from './tabs/TabRevenue';

const Drawer = createDrawerNavigator();
// 이곳에서 컨텍스트로 TabProgress에서 사용될 정보를 넘겨준다면 조금 더 빠르게 가능할까?
const ManageMain = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          drawerStyle: {
            width: '35%',
          },
          drawerLabelStyle: {
            fontSize: 30,
          },
          drawerActiveBackgroundColor: '#FFB871',
          drawerActiveTintColor: 'black',
        }}
        initialRouteName="TabInfo"
        drawerContent={props => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem
                style={{paddingTop: '97%'}}
                labelStyle={{fontSize: 30, marginLeft: 10}}
                label="↩️ 로그아웃"
                onPress={() => signOut()}
              />
            </DrawerContentScrollView>
          );
        }}>
        <Drawer.Screen name=" 가게 정보 " component={TabInfo} />
        <Drawer.Screen name=" 진행 중인 주문 " component={TabProgress} />
        <Drawer.Screen name=" 완료된 주문 " component={TabCompleted} />
        <Drawer.Screen name=" 메뉴 관리 " component={TabMenu} />
        {/* <Drawer.Screen name=" 매출 관리 " component={TabRevenue} /> */}
      </Drawer.Navigator>
    </>
  );
};

export default ManageMain;

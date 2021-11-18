import * as React from 'react';
import {useContext, useState, createContext} from 'react';
import {Text, Pressable, View, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
      <Drawer.Navigator initialRouteName="TabInfo">
        <Drawer.Screen name="TabInfo" component={TabInfo} options = {{headerTitle: () => <Text></Text>}} />
        <Drawer.Screen name="TabProgress" component={TabProgress} options = {{headerTitle: () => <Text></Text>}} />
        <Drawer.Screen name="TabCompleted" component={TabCompleted} options = {{headerTitle: () => <Text></Text>}} />
        <Drawer.Screen name="TabMenu" component={TabMenu} options = {{headerTitle: () => <Text></Text>}} />
        <Drawer.Screen name="TabRevenue" component={TabRevenue} options = {{headerTitle: () => <Text></Text>}} />
      </Drawer.Navigator>
      <Button title="singout" onPress={() => signOut()}></Button>
    </>
  );
};

export default ManageMain;

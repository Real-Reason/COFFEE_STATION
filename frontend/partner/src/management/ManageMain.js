import * as React from 'react';
import {useContext} from 'react';
import {Text, Pressable, View, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AuthContext} from '../App';

//Tabs
import TabDone from './tabs/TabDone';
import TabInfo from './tabs/TabInfo';
import TabMenu from './tabs/TabMenu';
import TabProgress from './tabs/TabProgress';
import TabRevenue from './tabs/TabRevenue';

const Drawer = createDrawerNavigator();

const ManageMain = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <>
      <Drawer.Navigator initialRouteName="TabDone">
        <Drawer.Screen name="TabDone" component={TabDone} />
        <Drawer.Screen name="TabInfo" component={TabInfo} />
        <Drawer.Screen name="TabMenu" component={TabMenu} />
        <Drawer.Screen name="TabProgress" component={TabProgress} />
        <Drawer.Screen name="TabRevenue" component={TabRevenue} />
      </Drawer.Navigator>
      <Button title="singout" onPress={() => signOut()}></Button>
    </>
  );
};

export default ManageMain;

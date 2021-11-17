import React from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManageMenu from './menutabs/ManageMenu';
import CreateMenu from './menutabs/CreateMenu';
import TabTest from './menutabs/TabTest';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const DeatailContainer = styled(Container)`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabMenu = ({navigation}) => {
  return (
    <Container>
      {/* TabNavigator 들어갈 자리 */}
      <Stack.Navigator style={{flex: 1}} initialRouteName={CreateMenu}>
        <Stack.Screen name="CreateMenu" component={CreateMenu} />
        <Stack.Screen name="ManageMenu" component={ManageMenu} />
      </Stack.Navigator>
    </Container>
  );
};

export default TabMenu;

import React from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManageMenu from './menutabs/ManageMenu';
import CreateMenu from './menutabs/CreateMenu';

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

const Stack = createNativeStackNavigator();

const TabMenu = ({navigation}) => {
  return (
    <Container>
      <Stack.Navigator style={{flex: 1}} initialRouteName={ManageMenu}>
        <Stack.Screen name="ManageMenu" component={ManageMenu} />
        <Stack.Screen name="CreateMenu" component={CreateMenu} />
      </Stack.Navigator>
    </Container>
  );
};

export default TabMenu;

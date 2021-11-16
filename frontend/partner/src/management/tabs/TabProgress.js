import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewOrder from './progresstabs/NewOrder';
import OnGoingOrder from './progresstabs/OnGoingOrder';
import styled from 'styled-components/native';
import axios from 'axios';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';
let paiedOrders = [];

const Container = styled.View`
  flex-direction: row;
  flex: 1;
`;

const Tab = createMaterialTopTabNavigator();

const TabProgress = ({navigation}) => {
  const showOrderList = async () => {
    try {
      const response = await axios.get(
        BASE_URL + '/shop/orders/today/status/ORDERED',
      );
      paiedOrders = response.data;
      console.log('PAID ORDERS RECEIVED');
    } catch (e) {
      console.log('신규 정보 못받아옴', e);
    }
  };

  useEffect(() => {
    showOrderList();
  }, []);
  return (
    <Container>
      <Tab.Navigator style={{flex: 0.5}} initialRouteName="Home">
        <Tab.Screen
          name="신규"
          component={NewOrder}
          initialParams={{DATA: paiedOrders}}
        />
        <Tab.Screen name="진행중" component={OnGoingOrder} />
      </Tab.Navigator>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>TabProgress</Text>
        <Button
          onPress={() => navigation.navigate('TabRevenue')}
          title="Go to TabRevenue"
        />
      </View>
    </Container>
  );
};

export default TabProgress;

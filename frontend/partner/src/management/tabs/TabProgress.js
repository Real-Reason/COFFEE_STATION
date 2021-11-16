import React from 'react';
import {View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewOrder from './progresstabs/NewOrder';
import OnGoingOrder from './progresstabs/OnGoingOrder';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: row;
  flex: 1;
`;

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View>
      <Text>ㅗㅜㅑ</Text>
    </View>
  );
};

const Home2 = () => {
  return (
    <View>
      <Text>아으야</Text>
    </View>
  );
};

const TabProgress = ({navigation}) => {
  return (
    <Container>
      <Tab.Navigator style={{flex: 0.5}} initialRouteName="Home">
        <Tab.Screen name="신규" component={NewOrder} />
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

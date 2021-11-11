import React, {useContext} from 'react';
import {AuthContext} from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './components/Intro';
import AuthUser from './components/AuthUser';
import Test from './components/Test';
import styled from 'styled-components/native';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="AuthUser" component={AuthUser} />
    </Stack.Navigator>
  );
};

export default Main;

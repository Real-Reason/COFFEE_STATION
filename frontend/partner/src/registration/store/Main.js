import React, {useContext} from 'react';
import {AuthContext} from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './components/Intro';
import AuthUser from './components/AuthUser';
import Test from './components/Test';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Test"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="AuthUser" component={AuthUser} />
    </Stack.Navigator>
  );
};

export default Main;

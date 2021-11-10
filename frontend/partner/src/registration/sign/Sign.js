import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';

const Stack = createNativeStackNavigator();

const Sign = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default Sign;

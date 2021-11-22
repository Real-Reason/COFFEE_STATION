import React, {useContext} from 'react';
import {AuthContext} from '../../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from './components/Intro';
import AuthUser from './components/AuthUser';
import RegiStore from './components/RegiStore';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName="Intro"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="AuthUser" component={AuthUser} />
      <Stack.Screen name="RegiStore" component={RegiStore} />
    </Stack.Navigator>
  );
};

export default Main;

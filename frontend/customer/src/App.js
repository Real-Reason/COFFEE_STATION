import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import messaging from '@react-native-firebase/messaging';

import Main from './views/Main';
import Signup from './views/user/Signup';
import {Alert} from 'react-native';
const Stack = createNativeStackNavigator();
const AuthContext = createContext();
const baseURL = 'http://3.38.99.110:8080/api/customer'

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ email, password })} />
      
      <Text>Login</Text>
      <Button title="Sign up" onPress={() => navigation.navigate('Signup')}></Button>
    </View>
  );
}


const App = ({ navigation }) => {


  //firebase  관련
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // const orderId = remoteMessage['data'].orderId;
      // console.log(orderId);
      Alert.alert(                    // 말그대로 Alert를 띄운다
        "주문 현황!!",        // 첫번째 text: 타이틀 제목
        JSON.stringify(remoteMessage['notification']),
      );
    });
    return unsubscribe;
  }, []);

  // 토큰 저장
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(firebaseToken => {
        console.log(firebaseToken);
        return saveTokenToDatabase(firebaseToken);
      });
    // Listen to whether the token changes
    return messaging().onTokenRefresh(firebaseToken => {
      saveTokenToDatabase(firebaseToken);
    });
  }, []);

  const saveTokenToDatabase = async (token) => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log(userToken, "현재 로그읺한 유저 토큰임")
    if ( userToken !== null ){
      try {
      const response = await axios.patch(
        baseURL + '/firebase-token', 
        {'firebaseToken': token},
        { headers: {"Authorization" : `Bearer ${userToken}`} }
      );
      console.log('zzzzzz리스폰스임!',response.data, '\n');
    } catch (e) {
      console.log(e);
    }
    }
  }

  //--------------
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place 
    // 마운트 하면서 토큰 있다면 가져오기
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e)
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();

  }, []);
  
  const authContext = useMemo(
    () => ({
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signIn: async data => {
        let userToken;
        try {
          console.log(data)
          const response = await axios.post(
            'http://3.38.99.110:8080/api/customer/login',
            data
          );
          
          console.log(response.data.token)
          userToken = response.data.token
          await AsyncStorage.setItem('userToken', userToken);
          dispatch({ type: 'SIGN_IN', token: userToken });
          // firebase 토큰 받아오기
          console.log("토큰 받아오는 중")
          const token = messaging().getToken()
          .then(async token => {
            console.log("진짜 토큰이야~~~~", token)
            let userToken = await AsyncStorage.getItem('userToken');
            if (userToken !== null ){
              console.log('유저 토큰은', userToken)
              console.log('로그인한 상태니까 저장도 해줄게.')
              saveTokenToDatabase(token)
            }
          })
          console.log("토큰이다 !!!!!!!", token)
        } catch (e) {
          console.log(e)
        }
      },
    }),
    [],
  );

  // const dumy = 'dumy'

  return (
  <AuthContext.Provider value={authContext}>
    <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : (
            <Stack.Screen 
              name="Main" 
              component={Main} 
              options = {{
                headerTitle: () => <Text>Cafe Station</Text>,
                headerRight: () => (
                  <Button title="SignOut" onPress={() => authContext.signOut()} />
                )
              }}
            />
          )}
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
}

export default App;
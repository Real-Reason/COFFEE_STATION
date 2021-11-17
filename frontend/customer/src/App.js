import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import messaging from '@react-native-firebase/messaging';

import Main from './views/Main';
import Signup from './views/user/Signup';
import {Alert} from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  padding: 50px;
  background-color: white;
  border-radius: 5px;
  height: 100%;
`
const StTextInput = styled.TextInput`
  font-family: 'InfinitySansR';
  padding-left: 20px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 5px;
  border: #cacaca 1px;
  box-shadow: 2px 2px 5px #cacaca;
`
const StPressable = styled.Pressable`
  background: black;
  margin-bottom: 5px;
  border-radius: 5px;
  width: 49.2%;
  align-items: center;
`
const StText = styled.Text`
  font-family: 'InfinitySansR';
  padding: 15px;
  color: #ffffff;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
`
const StView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Stack = createNativeStackNavigator();
const AuthContext = createContext();
const baseURL = `${process.env.REACT_APP_BASE_URL}api/customer`

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  return (
    <Container>
      <StTextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
        <StTextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          />
        <StView>
        <StPressable color="#FF7F00" 
        onPress={() => signIn({ email, password })} 
        >
          <StText>
            로그인
          </StText>
        </StPressable>
        <StPressable 
        color="#FF7F00" 
        onPress={() => navigation.navigate('Signup')}
        >
          <StText>
            회원 가입
          </StText>
        </StPressable>
      </StView>
      
    </Container>
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
    console.log(process.env.REACT_APP_BASE_URL)
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
          console.log(process.env.REACT_APP_BASE_URL)
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}api/customer/login`,
            data
          );
          
          console.log(response.data.token)
          userToken = response.data.token
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('email', data.email);
          dispatch({ type: 'SIGN_IN', token: userToken });
          // firebase 토큰 받아오기
          console.log("토큰 받아오는 중")
          const token = messaging().getToken()
          .then(async token => {
            let userToken = await AsyncStorage.getItem('userToken');
            if (userToken !== null ){
              console.log('유저 토큰은', userToken)
              console.log('로그인한 상태니까 저장도 해줄게.')
              saveTokenToDatabase(token)
            }
          })
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
        <Stack.Navigator
          screenOptions={({route}) => ({ 
            headerShown: false
          })}
        >
          {state.userToken == null ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : (
            <Stack.Screen 
              name="Main" 
              component={Main} 
              options = {{
                headerTitle: () => <StText>Cafe Station</StText>,
                headerRight: () => (
                  <StPressable onPress={() => authContext.signOut()}>
                    <StText>
                      로그아웃
                    </StText>
                  </StPressable> 
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

export {AuthContext};
export default App;
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Main from './Main';
import axios from '../../customer/node_modules/axios';

// styled-components
const StyledInput = styled.TextInput`
  border: 1px solid #111111;
  padding: 10px;
  margin: 10px 0;
  width: 200px;
  font-size: 24px;
`;

const StyledButton = styled.Button`
  font-size: 20px;
  padding: 10px;
  margin: 10px 0;
`;
// styled-components

const AuthContext = createContext();
const Stack = createNativeStackNavigator();

// SignInScreen에서 SignIn 버튼을 눌렀을 때 실행될 함수 정의
const HandleSignIn = () => {
  // const response = await axios.post(
  //   'http://'
  // )
};

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  const refEmail = useRef(null);
  const refPassword = useRef(null);

  useEffect(() => {
    console.log('=-=-=-=-=-=- SignInScreen Mount =-=-=-=-=-=-');
    refEmail.current.focus();
  }, []);

  return (
    <>
      <StyledInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        ref={refEmail}
        returnKeyType="next"
        onSubmitEditing={() => refPassword.current.focus()}></StyledInput>
      <StyledInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        ref={refPassword}
        returnKeyType="done"
        // onSubmitEditing={onSubmit}
        secureTextEntry></StyledInput>
      <StyledButton title="Sign in" onPress={() => signIn({email, password})} />
    </>
  );
};

export default function App({navigation}) {
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
    },
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        console.log('UserToken: ', userToken);
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);
  // useMemo = 메모이제이션된 값을 반환.
  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let userToken;
        try {
          console.log(data);
          const response = await axios.post(
            'http://10.0.2.2:8080/api/customer/login',
            data,
          );

          console.log(response.data.token);
          userToken = response.data.token;
          await AsyncStorage.setItem('userToken', userToken);
          dispatch({type: 'SIGN_IN', token: userToken});
        } catch (error) {
          console.log(error);
        }
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      // signUp: async data => {

      //   dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      // },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : (
            <Stack.Screen name="Main" component={Main} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

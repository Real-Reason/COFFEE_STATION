import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import Main from './Main';
import axios from 'axios';

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

const SplashScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

const HomeScreen = () => {
  const {signOut} = useContext(AuthContext);

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useContext를 사용해 AuthContext가 value로 가지고 있는 signIn
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
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        let userToken;
        // try {
        //   console.log(data);
        //   const response = await axios.post(
        //     'http://localhost:8080/api/partner/login',
        //     data,
        //   );

        //   console.log(response.data.token);
        //   userToken = response.data.token;
        //   await AsyncStorage.setItem('userToken', userToken);
        //   dispatch({type: 'SIGN_IN', token: 'userToken'});
        // } catch (error) {
        //   console.log(error);
        // }
        await axios
          .post('http://localhost:8080/api/partner/login', data)
          .then(function (response) {
            console.log('Login! Token : ', response.data.token);
            userToken = response.data.token;
            AsyncStorage.setItem('userToken', userToken);
            dispatch({type: 'SIGN_IN', token: 'userToken'});
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      // signUp: async data => {
      //   dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      // },
    }),
    [],
  );

  return (
    // authContext를 value로 넘겨주고 useContext를 사용하기 때문에 AuthContext의 Children으로 있는
    // 나머지 컴포넌트들이 Consumer 없이 authContext를 받아서 사용할 수 있게 된다.
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

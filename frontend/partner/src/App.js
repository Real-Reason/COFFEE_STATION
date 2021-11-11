import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import axios from 'axios';
import Sign from './registration/sign/Sign';
import SignInScreen from './registration/sign/components/SignInScreen';
import Main from './registration/store/Main';
import messaging from '@react-native-firebase/messaging';

const AuthContext = createContext();
const Stack = createNativeStackNavigator();

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

  useEffect(() => {
  // Get the device token(firebase)
      messaging()
        .getToken()
        .then(token => {
          console.log(token);
        });

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

        await axios
          .post('http://10.0.2.2:8080/api/partner/login', data)
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
        <Stack.Navigator
          // 해당 Stack.Navigator에 속하는 Header 모두 숨김
          screenOptions={{
            headerShown: false,
          }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Sign"
              component={Sign}
              options={{
                title: 'Sign',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : state.storeToken == null ? (
            // User is signed in && No storeToken
            <Stack.Screen name="Home" component={Main} />
          ) : (
            // storeToken 가지고 있는 상태
            <Stack.Screen name="Main" component={Main} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// AuthContext를 다른곳에서 사용하기 위해
export {AuthContext};

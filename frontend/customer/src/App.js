import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './views/Main'

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


const AuthContext = createContext();
const Stack = createNativeStackNavigator();

GoogleSignin.configure({
  webClientId : '167399706870-8vccbd4fpid07c3d7n0s8ai4rb34f7fe.apps.googleusercontent.com',
  androidClientId: "167399706870-6f7g79mk2gt89k9qsic140gii05umev6.apps.googleusercontent.com",
  offlineAccess : true,
  scopes: ['profile', 'email'],
})

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  const [state, setState] = useState({
    userGoogleInfo: {},
    loaded: false
  })

  
  // const URL = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&response_type=code&redirect_uri=http://localhost:8080/login/oauth2/code/google&client_id=167399706870-8vccbd4fpid07c3d7n0s8ai4rb34f7fe.apps.googleusercontent.com'

  const googleSiginin = async() => {
    try {
      GoogleSignin.configure(
      {
        //webClientId is required if you need offline access
        // offlineAccess: true,
        // webClientId:'2423432-43234234232432423234.apps.googleusercontent.com',
        androidClientId: '3242343242322432-2342323432232324343323.apps.googleusercontent.com',
        // scopes: ['profile', 'email']
      });
      await GoogleSignin.hasPlayServices();
      console.log("reached google sign in");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setState({ 
        userGoogleInfo:userInfo, 
        loaded:true 
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("error occured SIGN_IN_CANCELLED");
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("error occured IN_PROGRESS");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("error occured PLAY_SERVICES_NOT_AVAILABLE");
      } else {
        console.log(error)
        console.log("error occured unknow error");
      }
    }
  }

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
      <GoogleSigninButton 
        onPress={googleSiginin}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        style={{width:100, height:100}}
      />
      {state.loaded ?
      <View>
        <Text>{state.userGoogleInfo.user.name}</Text>
        <Text>{state.userGoogleInfo.user.email}</Text>
      </View> :
      <Text> Not Login </Text>
      }
      {/* <Button title="google2" href={URL}></Button> */}
    </View>
  );
}


const App = ({ navigation }) => {
  
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
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        // 여기서 axios로 api에 요청 보내서 토큰 가져오기
        let userToken;
        try {
          console.log(data)
          const response = await axios.post(
            'http://10.0.2.2:8080/api/customer/login',
            data
          );
          
          console.log(response.data.token)
          userToken = response.data.token
          await AsyncStorage.setItem('userToken', userToken);
          dispatch({ type: 'SIGN_IN', token: userToken });
        } catch (e) {
          console.log(e)
        }
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
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
};

export default App;
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Main from './views/Main'

const Stack = createNativeStackNavigator();
const AuthContext = createContext();

const SignInScreen = () => {
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

  const dumy = 'dumy'

  return (
  <AuthContext.Provider value={authContext}>
    <NavigationContainer>
        <Stack.Navigator>
          {dumy == null ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : (
            <Stack.Screen name="Main" component={Main} />
          )}
        </Stack.Navigator>
    </NavigationContainer>
  </AuthContext.Provider>
  );
}

export default App;
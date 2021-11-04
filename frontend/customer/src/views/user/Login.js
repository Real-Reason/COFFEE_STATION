import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin'

GoogleSignin.configure({
  webClientId : '167399706870-8vccbd4fpid07c3d7n0s8ai4rb34f7fe.apps.googleusercontent.com',
  offlineAccess : true
})

const Login = () => {
  const [state, setState] = useState({
    userGoogleInfo: {},
    loaded: false
  })

  const siginin = async() => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setState({
        userGoogleInfo: userInfo,
        loaded: true
      })
    }
    catch(error) {
      console.log(error.message);
    }
  }

  return (
      <View>
        <Text>Login</Text>
        <GoogleSigninButton 
          onPress={siginin}
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
      </View>
  );
}

export default Login;
import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Sign from './registration/sign/Sign';
import RegiMain from './registration/store/RegiMain';
import ManageMain from './management/ManageMain';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {TabProgressContext} from './management/tabs/TabProgress';

const AuthContext = createContext();
const Stack = createNativeStackNavigator();
const baseURL = 'http://3.38.99.110:8080/api/partner';

// SplashScreen 디자인 필요
const SplashScreen = () => {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default function App({navigation}) {
  let firebaseToken;
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log('=-=-=-=-=-=-=- action =-=-=-=-=-=-=-', action);
      switch (action.type) {
        case 'RESTORE_STATE':
          return {
            ...prevState,
            userToken: action.token,
            hasRegistered: action.regi,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            hasRegistered: JSON.parse(action.regi),
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            hasRegistered: false,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: null,
          };
        case 'REGI_SHOP':
          return {
            ...prevState,
            hasRegistered: true,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      hasRegistered: false,
    },
  );

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // const orderId = remoteMessage['data'].orderId;
      // console.log(orderId);
      Alert.alert(
        // 말그대로 Alert를 띄운다
        '주문을 수락하시겠습니까?', // 첫번째 text: 타이틀 제목
        JSON.stringify(remoteMessage['notification']),
        [
          {
            text: '수락하기', // 버튼 제목
            onPress: () => {
              // TabProgress의 신규 리스트 갱신
              console.log(remoteMessage['data'].orderId);
              Alert.alert('주문을 수락했습니다.');
            },
          },
          {
            text: '거절하기',
            onPress: () => {
              updateOrderStatus(remoteMessage['data'].orderId, 'REJECT');
              console.log(remoteMessage['data'].orderId);
              Alert.alert('주문을 거절했습니다.');
            },
          },
        ],
        {cancelable: false},
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
        return saveTokenToDatabase({firebaseToken});
      });
    // Listen to whether the token changes
    return messaging().onTokenRefresh(firebaseToken => {
      saveTokenToDatabase({firebaseToken});
    });
  }, []);
  // const baseURL = 'http://10.0.2.2:8080/api/partner'
  const saveTokenToDatabase = async data => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log('====usertoken========' + userToken);
    if (userToken !== null) {
      await axios
        .patch(baseURL + '/firebase-token', data, {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        })
        .then(res => {
          console.log('success', res.data);
        })
        .catch(error => {
          console.log('fail', error);
        });
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    let userToken = await AsyncStorage.getItem('userToken');
    console.log('====usertoken========' + userToken);
    await axios
      .patch(
        baseURL + `/shop/orders/${orderId}/status`,
        {status: status},
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      )
      .then(res => {
        console.log('status 변경 완료', res.data);
      })
      .catch(error => {
        console.log('status 변경 실패', error);
      });
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let hasRegistered;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        hasRegistered = JSON.parse(await AsyncStorage.getItem('hasRegistered'));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
        // console.log('UserToken: ', userToken);
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      // 레지스터도 리스토어 시켜줘야 할 거 같은데
      dispatch({type: 'RESTORE_STATE', token: userToken, regi: hasRegistered});
    };

    bootstrapAsync();
  }, []);
  // useMemo = 메모이제이션된 값을 반환.
  const authContext = useMemo(
    () => ({
      signIn: async data => {
        let userToken;
        let hasRegistered;

        await axios
          .post(baseURL + '/login', data)
          .then(function (response) {
            userToken = response.data.token;
            // axios default header 설정
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${userToken}`;
            // AsyncStorage 아이템 저장
            hasRegistered = JSON.stringify(response.data.registerShop);
            AsyncStorage.setItem('userToken', userToken);
            AsyncStorage.setItem('hasRegistered', hasRegistered);
            dispatch({type: 'SIGN_IN', token: userToken, regi: hasRegistered});

            // firebase 토큰 받아오기
            console.log('토큰 받아오는 중');
            const firebaseToken = messaging()
              .getToken()
              .then(async firebaseToken => {
                console.log('진짜 ㅍㅏ이어베이스토큰이야~~~~', firebaseToken);
                console.log('유저 토큰은', userToken);
                console.log('로그인한 상태니까 저장도 해줄게.');
                saveTokenToDatabase({firebaseToken});
              });
            console.log('토큰이다 !!!!!!!', token);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('hasRegistered');
          axios.defaults.headers.common['Authorization'] = undefined;
          dispatch({type: 'SIGN_OUT'});
        } catch {
          console.warn('SIGN OUT FAIL!');
        }
      },
      signUp: async data => {
        await axios
          .post(baseURL + '/join', data)
          .then(function (response) {
            console.log('Sign Up!', response.data);
            alert('회원가입 성공');
            dispatch({type: 'SIGN_UP'});
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      registerShop: async data => {
        try {
          console.log(data);
          const response = await axios.post(baseURL + '/shop', data);
          console.log(response.data);
          // dispatch 필요
          dispatch({type: 'REGI_SHOP'});
        } catch (e) {
          console.log('whyrano', e);
        }
      },
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
            // 유저 토큰이 없음, sign in 되지 않은 상태
            <Stack.Screen
              name="Sign"
              component={Sign}
              options={{
                title: 'Sign',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : state.hasRegistered == false ? (
            // 로그인은 했지만 가게등록을 하지 않은 상태
            <Stack.Screen name="Home" component={RegiMain} />
          ) : (
            // 가게까지 등록한 상태
            <Stack.Screen name="Main" component={ManageMain} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// AuthContext를 다른곳에서 사용하기 위해
export {AuthContext};

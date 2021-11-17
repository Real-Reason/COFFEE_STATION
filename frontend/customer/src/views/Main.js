import React, { useContext, useEffect, useState, createContext } from 'react';
import { Button, Text, Image, Pressable, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './cafe/MainScreen'
import Favorite from './user/Favorite'
import CartAndOrder from './user/Cart'
import Order from './user/Orderlist'
import Search from './search/Search';
import Mypage from './user/Mypage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import styled from 'styled-components/native';
import { AuthContext } from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StPressable = styled.Pressable`
  background: white;
  margin-bottom: 5px;
  border-radius: 5px;
  width: 49.2%;
  align-items: center;
`

const StText = styled.Text`
  font-family: 'InfinitySansR';
  padding: 10px;
  color: #000000;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
`
const StTextWhite = styled.Text`
  font-family: 'InfinitySansR';
  font-size: 20px;
  padding: 15px;
  color: #ffffff;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
`
const DrawerView = styled.View`
  background-color: white;
  align-items: center;
  justyfy-contents: center;
`
const SignOutButton = styled.Pressable`
  background-color: #FF7F00;
  align-items: center;
  margin-top: 20px;
  width: 80%;
  border-radius: 5px;  
`


const Tab = createBottomTabNavigator();
const TabBarIcon = (focused, name) => {
  let iconImagePathActive;
  let iconImagePathInActive;
  if(name === 'MainScreen') {
    iconImagePathActive = require('../assets/icons/coffee-active.png')
    iconImagePathInActive = require('../assets/icons/coffee-inactive.png')
  } else if (name === 'Favorite') {
    iconImagePathActive = require('../assets/icons/like-active.png')
    iconImagePathInActive = require('../assets/icons/like-inactive.png')  
  } else if (name === 'CartAndOrder') {
    iconImagePathActive = require('../assets/icons/cart-active.png')
    iconImagePathInActive = require('../assets/icons/cart-inactive.png')  
  } else if (name === 'Order') {
    iconImagePathActive = require('../assets/icons/orderlist-active.png')
    iconImagePathInActive = require('../assets/icons/orderlist-inactive.png')  
  } 
  else if (name === 'Mypage') {
    iconImagePathActive = require('../assets/icons/search-active.png')
    iconImagePathInActive = require('../assets/icons/search-inactive.png')  
  }

  return (
    <Image
      style={{width: name == 'MainScreen'? 26:24, height: name == 'MainScreen'? 26 : 24}}
      // style={{width: 24, height: 24}}
      source={focused? iconImagePathActive:iconImagePathInActive}
    />
  )
}

const MenuToCartContext = createContext();

const MainTab = ({navigation}) => {

  const [cartListItems, setCartListItems] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [shopName, setShopName] = useState('');

  const value = {
    cartListItems,
    setCartListItems,
    isCart,
    setIsCart,
    shopName,
    setShopName
  }

  return (
    <MenuToCartContext.Provider value={value}>
      <Tab.Navigator
        screenOptions={({route}) => ({ //각 탭에 그림 삽입 및 선택 효과
          headerShown: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: 'white',
            padding: 10
          },
          tabBarLabelStyle: {
            paddingBottom: 7,
            fontSize: 13,
            fontFamily: 'InfinitySansR'
          },
          tabBarLabel: route.name,
          tabBarIcon: ({focused})=> (
            TabBarIcon(focused, route.name) // 함수 호출
          ),
          tabBarActiveTintColor: '#FF7F00',
        })}
      >
        <Tab.Screen 
          name="MainScreen" component={MainScreen} 
          options={{ tabBarLabel: 'Home' }} 
        />
        <Tab.Screen 
          name="Favorite" component={Favorite} 
          options={{ tabBarLabel: '즐겨찾기' }} 
        />
        <Tab.Screen 
          name="CartAndOrder" component={CartAndOrder} 
          options={{ tabBarLabel: '카트' }}
        />
        <Tab.Screen 
          name="Order" component={Order} 
          options={{ tabBarLabel: '주문내역' }} 
        />
        <Tab.Screen 
          name="Mypage" component={Mypage} 
          options={{ 
            tabBarLabel: 'Mypage',
            tabBarButton: (props) => (
              <CustomTabBarButton onPress={() => navigation.toggleDrawer()} />
            )
          }} 
        />
      </Tab.Navigator>
    </MenuToCartContext.Provider>
  );
}

const CustomTabBarButton = ({ children, onPress }) => {
  return(
  <Pressable onPress={onPress}>
    <View style={{ alignItems: 'center', marginRight:18, marginLeft:10 }}>
      <Image 
        source={require('../assets/icons/search-inactive.png')}
        style={{
          width:23,
          height:23
        }}
      />
      <Text>myPage</Text>
    </View>
  </Pressable>
  )
}

const Drawer = createDrawerNavigator();

const Main = ({navigation}) => {

  const { signOut } = useContext(AuthContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getemail();
  }, []);

  const getemail = async() => {
    let useremail = await AsyncStorage.getItem('email');
    setEmail(useremail);
  }

  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={props => {
      return (
        <DrawerView>
          <StText style={{ marginTop:50, fontSize:20 }}>어서요세요!</StText>
          <StText style={{ fontSize:20}}>{ email } 님!</StText>
          <SignOutButton onPress={() => signOut()}>
            <StTextWhite>SIGN OUT</StTextWhite>
          </SignOutButton>
        </DrawerView>
      )
    }}>
      <Drawer.Screen 
        name="MainTab" 
        component={MainTab} 
        options = {{
          headerTitle: () => <StText>Cafe Station</StText>,
          headerRight: () => (
            <StPressable onPress={() => navigation.navigate('Search')}>
              <Image 
                source={require('../assets/icons/search-inactive.png')}
                style={{
                  width:30,
                  height:30
                }}
              />
            </StPressable> 
          )
        }}
      />
      <Drawer.Screen name="Mypage" component={Mypage} />
    </Drawer.Navigator>
  )
}

export {MenuToCartContext}
export default Main;
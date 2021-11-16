import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cafe = ({ navigation, route }) => {

  useEffect(() => {
    console.log(' cafe detail mount');
    setCafeDetail();
    return () => console.log(' cafe detail Unmount');
  }, []);

  const [cafeDetail, getCafeDetail] = useState({});
  const [cafeMenus, getCafeMenus] = useState([]);

  const setCafeDetail = async() => {
    console.log('get Cafe Detail');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/customer/shop/${route.params.id}`);
      console.log(response.data);
      getCafeDetail(response.data);
      console.log(response.data.menuList.menuList);
      getCafeMenus(response.data.menuList.menuList);
    } catch (e) {
      console.log(e);
    }
  }

  const likeCafe = async() => {
    console.log(`${route.params.id}번 카페 좋아여`);
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/shop/${route.params.id}`, 
        {},
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <View>
        <Text>Cafe</Text>
        <Text>{ cafeDetail.address }</Text>
        <Text>{ cafeDetail.intro }</Text>
        <Text>{ cafeDetail.phone_number }</Text>
        <Text>{ cafeDetail.open_at } ~ { cafeDetail.close_at }</Text>
        <Text></Text>

        {cafeMenus.map((cafeMenu, index) => (
          <Pressable key={index} onPress={() => navigation.navigate('Cafemenu', {id: route.params.id, menuInfo: cafeMenu})}>
            <Text> cafe name : { cafeMenu.name } </Text>
          </Pressable>
        ))}

        <Button title='좋아요~' onPress={() => likeCafe()}></Button>

      </View>
  );
}

export default Cafe;
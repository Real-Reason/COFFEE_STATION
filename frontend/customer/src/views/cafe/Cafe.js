import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import axios from 'axios';


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
      const response = await axios.get(`http://3.38.99.110:8080/api/customer/shop/${route.params.id}`);
      console.log(response.data);
      getCafeDetail(response.data);
      console.log(response.data.menuList.menuList);
      getCafeMenus(response.data.menuList.menuList);
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

      </View>
  );
}

export default Cafe;
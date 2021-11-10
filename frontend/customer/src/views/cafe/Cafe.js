import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import axios from 'axios';


const Cafe = ({ route }) => {

  useEffect(() => {
    console.log(' cafe detail mount');
    console.log(route);
    setCafeDetail();
    return () => console.log(' cafe detail Unmount');
  }, []);

  const [cafeDetail, getCafeDetail] = useState({});
  const [cafeMenus, getCafeMenus] = useState([]);

  const setCafeDetail = async() => {
    console.log('get Cafe Detail');
    try {
      const response = await axios.get(`http://10.0.2.2:8080/api/customer/shop/${route.params.id}`);
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

        {cafeMenus.map((cafeMenu, index) => (
          <Pressable key={index} onPress={() => alert(cafeMenu.name)}>
            <Text> cafe name : { cafeMenu.name } </Text>
          </Pressable>
        ))}

      </View>
  );
}

export default Cafe;
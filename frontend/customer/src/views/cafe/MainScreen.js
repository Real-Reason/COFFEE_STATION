import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Maps from '../map/Maps';
import Cafe from './Cafe';


const Stack = createNativeStackNavigator();

const MainCafeList = ({ navigation }) => {

  const [cafeList, setCafeList] = useState([]);

  const getInfo = async() => {
    console.log('get카페리스트...');
    const params = { radius: 0.008, x: 127.013625487132, y: 37.598830255568 };
    try {
      const response = await axios.get(
        `http://10.0.2.2:8080/api/customer/shop?x=${params.x}&y=${params.y}&radius=${params.radius}`
      );
      console.log(response.data);
      setCafeList(response.data)
    }
    catch (e) {
      console.log('카페리스트 받기 실패')
      console.log(e);
    }
  }

  const goCafeDetail = (point) => {
    console.log('카페상세로 이동하기');
    navigation.navigate('Cafe', point)
  }

  const goMaps = () => {
    console.log('지도로 이동하기');
    console.log('gps로 위치 받은 내 위치, 그 주소로 api요청해 얻은 주변 가게들 묶어서 보내기.');
    console.log('일단 radius: 0.008, x: 127.013625487132, y: 37.598830255568 랑 그걸로 받았던 cafeList로 함');
    const data = {mypoint: {x: 127.013625487132, y: 37.598830255568}, cafeList}
    navigation.navigate('Maps', data);
  }

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLogitude] = useState(null);

  const geoLocation = () => {
      Geolocation.getCurrentPosition(
          position => {
              const latitude = JSON.stringify(position.coords.latitude);
              const longitude = JSON.stringify(position.coords.longitude);

              setLatitude(latitude);
              setLogitude(longitude);
          },
          error => { console.log(error.code, error.message); },
          {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
      )
  }

  useEffect(() => {
    console.log(' main screen mount');
    getInfo();
    return () => console.log('main screen Unmount');
  }, []);

  return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Button title="maps" onPress={() => goMaps()}></Button>
        <Text>Ccafe List will be here!!</Text>
        <Pressable onPress={() => geoLocation()}>
            <Text> Get GeoLocation </Text>
        </Pressable>
        <Text> latitude?: {latitude} </Text>
        <Text> longitude?: {longitude} </Text>

        {cafeList.map((cafe, index) => (
          <Pressable key={index} onPress={() => goCafeDetail(cafe)}>
            <Text> cafe name : {cafe.name} </Text>
          </Pressable>
        ))}

      </View>
  );
}


const MainScreen = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="MainCafeList" component={MainCafeList} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Cafe" component={Cafe} />
      </Stack.Navigator>
  );
}

export default MainScreen;
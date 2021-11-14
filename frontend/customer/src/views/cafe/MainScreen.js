import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Button, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Maps from '../map/Maps';
import Cafe from './Cafe';
import Cafemenu from './Cafemenu';

import styled from 'styled-components/native';


const StyledCafeList = styled.View`
  justify-content: center;
  width: 410px;
  height: 80px;
  padding: 5px;
  border: 1px #dcdcdc;
  border-radius: 5px;
  overflow-y: scroll;
`
const StyledCafeItem = styled.Text`
  font-size: ${props => props.title ? "16px" : "13px"};
  font-weight : ${props => props.title ? "bold" : "normal"};
  padding-bottom: ${props => props.title ? "10px" : "0px"};
  color: ${props => props.distance ? "white" : "black"};
`
const StyledDistance = styled.View`
  justify-content: center;
  align-items: center;
  background: green;
  width: 60px;
  height: 20px;
  border-radius: 20px;
`

const Stack = createNativeStackNavigator();

const MainCafeList = ({ navigation }) => {

  const [cafeList, setCafeList] = useState([]);

  const getInfo = async() => {
    console.log('get카페리스트...');
    const params = { radius: 0.01, x: 127.013625487132, y: 37.598830255568 };
    try {
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/shop?x=${params.x}&y=${params.y}&radius=${params.radius}`
      );
      console.log(response.data);
      setCafeList(response.data)
    }
    catch (e) {
      console.log('카페리스트 받기 실패!')
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
    console.log(' main screen mount!!');
    getInfo();
    return () => console.log('main screen Unmount!');
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
          {/* <ScrollView scrollEnabled={scrollEnabled}> */}
          <StyledCafeList>
            <StyledCafeItem title>{cafe.name}</StyledCafeItem>
            <StyledCafeItem>{cafe.address}</StyledCafeItem>
            <StyledDistance>
              <StyledCafeItem distance>{(cafe.distanceFrom * 100).toFixed(3)} m</StyledCafeItem>
            </StyledDistance>
          </StyledCafeList>
          {/* </ScrollView> */}
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
      <Stack.Screen name="Cafemenu" component={Cafemenu} />
    </Stack.Navigator>
  );
}

export default MainScreen;



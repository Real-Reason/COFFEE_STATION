import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Maps from '../map/Maps';
import Cafe from './Cafe';
import Cafemenu from './Cafemenu';
import Search from '../search/Search';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
`

const Col1 = styled.View`
  flex-direction: column;
  width: 30%;
`

const Col2 = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 50%;
  padding-right: 10px;
`

const Col3 = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
`

const Image = styled.Image`
  border-radius: 40px;
  width: 80px;
  height: 80px;
`

const StyledCafeList = styled.View`
  padding: 5px;
  margin-bottom: 5px;
  border: 0.5px #dcdcdc;
`;

const StyledCafeItem = styled.Text`
  font-size: ${props => props.title ? "16px" : "13px"};
  /* font-weight : ${props => props.title ? "bold" : "normal"}; */
  color: ${props => props.distance ? "white" : "black"};
  font-family: ${props => props.title ? "InfinitySans-Bold" : "InfinitySansR"};
  /* 'InfinitySansR'; */
`

const StyledDistance = styled.View`
  justify-content: center;
  align-items: center;
  background: #FF7F00;
  width: 60px;
  height: 20px;
  border-radius: 20px;
`;

const StyledMapView = styled.View`
  /* align-items: flex-end; */
  width: 100%;
  height: 120px;
`;

const StyledMapBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width:100%;
  height: 100%;
  border-radius: 5px;
  /* background-color: #FF7F00; */
  background-color: 'rgba(52, 52, 52, 0.5)';
`
const ScrollContainer = styled.ScrollView`
  /* height: 80%; */
  background-color: #ffffff;
`;

const BtnImage = styled.Image`
  width: 50px;
  height: 50px;
`

// const mapImgUrl = {uri : "https://blog.kakaocdn.net/dn/cVaDdC/btqKEz4LyEY/EyMCIu2K3zbzwaPAO4RN71/img.png"};
const mapImgUrl = require('../../assets/icons/map-ill.jpg')
const Stack = createNativeStackNavigator();

const MainCafeList = ({ navigation, route  }) => {

  const [cafeList, setCafeList] = useState([]);

  const getInfo = async() => {
    console.log('get카페리스트...');
    const params = { radius: 0.05, x: 127.013625487132, y: 37.598830255568 };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/shop?x=${params.x}&y=${params.y}&radius=${params.radius}`
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
        // flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
      }}
      >

      <StyledMapView>
        <ImageBackground source={mapImgUrl} resizeMode="cover" style={{ flex: 1 }}>
          <StyledMapBtn title="maps" onPress={() => goMaps()}>
            <BtnImage source={require('../../assets/icons/map.png')}></BtnImage>
            <Text style={{ color: "white", fontFamily: 'InfinitySans-Bold', marginTop: 3 }}>지도에서 찾기</Text>
          </StyledMapBtn>
        </ImageBackground>
      </StyledMapView>

      <ScrollContainer>
        {cafeList.map((cafe, index) => (
          <TouchableOpacity key={index} onPress={() => goCafeDetail(cafe)}>
            <StyledCafeList>
              <Row>
                <Col1>
                  <Image source={{uri : cafe.shopImgUrl}}></Image>
                </Col1>
                <Col2>
                  <StyledCafeItem title>
                    {cafe.name}
                  </StyledCafeItem>
                  <StyledCafeItem>
                    {cafe.address}
                  </StyledCafeItem>
                </Col2>
                <Col3>
                  <StyledDistance>
                    <StyledCafeItem distance style={{ fontSize: 12}}>
                      {(cafe.distanceFrom * 100).toFixed(2)} km
                    </StyledCafeItem>
                  </StyledDistance>
                </Col3>
              </Row>
            </StyledCafeList>
          </TouchableOpacity>
        ))}
      <View><Text style={{height: 120, color: '#ffffff'}}>blank</Text></View>
      </ScrollContainer>
    </View>
  );


}

const MainScreen = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainCafeList" 
        component={MainCafeList} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name="Maps" component={Maps} />
      <Stack.Screen 
        name="Cafe" 
        component={Cafe} 
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen 
        name="Cafemenu" 
        component={Cafemenu} 
        options={({ route }) => ({ title: route.params.menuInfo.name })}
      />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default MainScreen;



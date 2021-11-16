import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Maps from '../map/Maps';
import Cafe from './Cafe';
import Cafemenu from './Cafemenu';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
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
`

const Col3 = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
`

const Image = styled.Image`
  align-items: center;
  margin: 5px;
  width: 80px;
  height: 60px;
  border-radius: 5px;
`

const StyledCafeList = styled.View`
  padding: 5px;
  margin-bottom: 5px;
  border: 1px #dcdcdc;
  border-radius: 5px;
`;

const StyledCafeItem = styled.Text`
  font-size: ${props => props.title ? "16px" : "13px"};
  font-weight : ${props => props.title ? "bold" : "normal"};
  color: ${props => props.distance ? "white" : "black"};
`;

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
  height: 100px;
`;

const StyledMapBtn = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 65px;
  height: 30px;
  border-radius: 5px;
  background-color: #FF7F00;
`
const ScrollContainer = styled.ScrollView`
  height: 80%;
  background-color: #ffffff;
`;

const mapImgUrl = {uri : "https://blog.kakaocdn.net/dn/cVaDdC/btqKEz4LyEY/EyMCIu2K3zbzwaPAO4RN71/img.png"};
const Stack = createNativeStackNavigator();

const MainCafeList = ({ navigation }) => {

  const [cafeList, setCafeList] = useState([]);

  const getInfo = async() => {
    console.log('get카페리스트...');
    const params = { radius: 0.01, x: 127.013625487132, y: 37.598830255568 };
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
        <ImageBackground source={mapImgUrl} resizeMode="cover" style={{flex: 1}}>
          <StyledMapBtn title="maps" onPress={() => goMaps()}>
            <Text style={{color: "white"}}>maps</Text>
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
                    <StyledCafeItem distance>
                      {(cafe.distanceFrom * 100).toFixed(3)} m
                    </StyledCafeItem>
                  </StyledDistance>
                </Col3>
              </Row>
            </StyledCafeList>
          </TouchableOpacity>
        ))}
      </ScrollContainer>
    </View>
  );


}

const MainScreen = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="MainCafeList" component={MainCafeList} />
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
    </Stack.Navigator>
  );
}

export default MainScreen;



import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import CafeMenuTab from './CafeMenuTab';
// import CafeIntroTab from './CafeIntroTab'


const StCafeImg = styled.Image`
  width: 100%;
  height: 20%;
`

const MenuImage = styled.Image`
  align-items: center;
  margin: 5px;
  width: 80px;
  height: 60px;
  border-radius: 5px;
`

const StCafeTitle = styled.View`
  justify-content: space-between;
  align-items: center;
  margin-left: 15%;
  margin-bottom: 10px;
  width: 70%;
  height: 18%;
  background-color: white;
  border: 1px;
  /* border-color: #FF7F00; */
  border-radius: 5px;
`

const Row1 = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${props => props.tab ? "8%" : "40%"};
  margin-top: ${props => props.tab ? "3%" : "0%"};

  /* border: 1px;
  border-color: red; */
`

const Row2 = styled.View`
  flex-direction: row;
  padding: 5px;
  width: 100%;

  /* border: 1px;
  border-color: orange; */
`

const Row3 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  width: 86%;
  background-color: white;

  /* border: 1px;
  border-color: red; */
`
const Row4 = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  width: 50%;

  /* border: 1px;
  border-color: orange; */
`

const Col1 = styled.View`
  width: ${props => props.title ? "30%" : "50%"};
  justify-content: space-evenly;
`
  
const Col2 = styled.View`
  width: 100%;
  height: 61%;
`

const Col3 = styled.View`
  flex-direction: column;
  justify-content: ${props => props.img ? "center" : "space-evenly"};
  align-items: ${props => props.img ? "center" : "flex-start"};
  margin-left: 5px;
  margin-right: 5px;
  width: ${props => props.img ? "30%" : "50%"};

  /* border: 1px;
  border-color: red; */
`

const StCafeTitleName = styled.Text`
  margin: 5px;
  color: black;
  font-size: 20px;
  font-family: 'InfinitySans-Bold';
`

const StCafeTitleItem = styled.Text`
  margin: 5px;
  text-align: center;
  height: 100%;
  color: black;
  font-size: 15px;
  font-family: 'InfinitySansR';

  /* border: 1px;
  border-color: green; */
`

const StTab = styled.View`
  justify-content: center;
  align-items: center;
  /* border: 1px; */
`
const StIntroView = styled.View`
  padding: 10px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color: white;
`

const StIntro = styled.Text`
  margin-bottom: ${props => props.title ? "3px": "0px"};
  padding: 3px;
  font-family: ${props => props.title ? "InfinitySans-Bold": "InfinitySansR"};
  font-size: ${props => props.title ? "15px": "12px"};
  color: black;
`


const Tab = createMaterialTopTabNavigator();

const Cafe = ({ navigation, route }) => {

  useEffect(() => {
    console.log(' cafe detail mount');
    setCafeDetail();
    return () => console.log(' cafe detail Unmount');
  }, []);

  const [cafeDetail, getCafeDetail] = useState({});
  const [cafeMenus, getCafeMenus] = useState([]);
  const [cafeImgList, setCafeImgList] = useState([]);

  const setCafeDetail = async() => {
    console.log('get Cafe Detail');
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/customer/shop/${route.params.id}`);
      console.log(response.data);
      getCafeDetail(response.data);
      setCafeImgList(response.data.imgUrlList)
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

  function CafeMenuTab() {
    return (
      <ScrollView>
        <StTab>
          {cafeMenus.map((cafeMenu, index) => (
            // === 메뉴별 Row =====
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Cafemenu', {id: route.params.id, menuInfo: cafeMenu, shopName: route.params.name})}>
              <Row3>
                {/* 메뉴 이름 및 가격 */}
                <Col3>
                  <StIntro title>{cafeMenu.name}</StIntro>
                  <StIntro>{cafeMenu.price} 원</StIntro>
                </Col3>
                {/* 메뉴 이미지 */}
                <Col3 img>
                  <MenuImage source={{uri : cafeMenu.imgUrl}}></MenuImage>
                </Col3>
              </Row3>
            </TouchableOpacity>
          ))}
        </StTab>
      </ScrollView>
    )
  }


  function CafeIntroTab() {
    return (
      <ScrollView>
        <StTab>
          <StIntroView>
            <StIntro title>가게 소개</StIntro>
            <StIntro>{ cafeDetail.intro }</StIntro>
          </StIntroView>
          <StIntroView>
            <StIntro title>가게 위치</StIntro>
            <StIntro>{ cafeDetail.address }</StIntro>
          </StIntroView>
          <StIntroView>
            <StIntro title>영업정보</StIntro>
            <Row2>
              <Col1 title>
                <StIntro> 운영시간 </StIntro>
                <StIntro> 전화번호 </StIntro>
                <StIntro> Instagram </StIntro>
              </Col1>
              <Col1>
                <StIntro>{ cafeDetail.open_at } ~ { cafeDetail.close_at }</StIntro>
                <StIntro>{ cafeDetail.phone_number }</StIntro>
                <StIntro>{ cafeDetail.instagram }</StIntro>
              </Col1>
            </Row2>
            
          </StIntroView>
          {/* <StIntroView>
            <StIntro>

            </StIntro>
          </StIntroView> */}
        </StTab>
      </ScrollView>
    )
  }


  return (
      <View>
        {/* 카페 이미지 */}
        <StCafeImg source={{uri : cafeImgList[0]}}></StCafeImg>
        {/* 가게 이름 및 전화 & 좋아요 */}
        <StCafeTitle>
          <StCafeTitleName>
            { cafeDetail.name }
          </StCafeTitleName>
          <Row1>
            <Row4>
              <Image source={require('../../assets/icons/call.png')} style={{width: 24, height: 24}}></Image>
              <StCafeTitleItem>전화</StCafeTitleItem>
            </Row4>
            <Row4>
              <TouchableOpacity style={{border: 1}}>
                <Image source={require('../../assets/icons/like-inactive.png')} style={{width: 24, height: 24}}></Image>
                <StCafeTitleItem onPress={() => likeCafe()}>좋아요</StCafeTitleItem>
              </TouchableOpacity>
            </Row4>
            
          </Row1>
        </StCafeTitle>

        {/* 메뉴/가게소개 Tab 및 스크롤 */}
        <Col2>
          <Tab.Navigator>
            <Tab.Screen name="메뉴" component={CafeMenuTab}></Tab.Screen>
            <Tab.Screen name="가게소개" component={CafeIntroTab}></Tab.Screen>
          </Tab.Navigator>
        </Col2>
      </View>
  );
}

export default Cafe;
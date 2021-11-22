
import React, { useEffect, useState, useContext } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Pressable, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SliderBox } from 'react-native-image-slider-box';
import {Linking} from 'react-native'
import { MenuToCartContext } from '../Main';
// import CafeMenuTab from './CafeMenuTab';
// import CafeIntroTab from './CafeIntroTab'


const StCafeImg = styled.Image`
  width: 100%;
  height: 20%;
`

const MenuImage = styled.Image`
  margin: 5px;
  width: 70px;
  height: 70px;
  border-radius: 40px;
  align-self: flex-start;
`

const StCafeTitle = styled.View`
  align-self: center;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
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
  width: 100%;
  background-color: white;
  padding:10px;
  align-items: center;
  border: #cacaca 0.5px;
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
  width: ${props => props.title ? "30%" : "70%"};
  justify-content: space-evenly;
`
  
const Col2 = styled.View`
  width: 100%;
  height: 75%;
`

const Col3 = styled.View`
  flex-direction: column;
  /* justify-content: ${props => props.img ? "flex-end" : "flex-start"}; */
  align-items: ${props => props.img ? "flex-end" : "flex-start"};
  margin-left: 5px;
  margin-right: 5px;
  width: ${props => props.img ? "40%" : "60%"};
  padding-left: ${props => props.img ? "0px" : "50px"};
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
  background-color: white;
  /* border: 1px; */
`
const StIntroView = styled.View`
  padding-top: 30px;
  padding-left: 0;
  margin-bottom: 5px;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background-color: white;
`

const StIntro = styled.Text`
  margin-bottom: ${props => props.title ? "3px": "0px"};
  padding: 3px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: ${props => props.title ? "InfinitySans-Bold": "InfinitySansR"};
  font-size: ${props => props.title ? "15px": "15px"};
  color: black;
`
const IconImage = styled.Image`
  height: 20px;
  width: 20px;
`

const Tab = createMaterialTopTabNavigator();

const Cafe = ({ navigation, route }) => {

  useEffect(() => {
    console.log(' cafe detail mount');
    setCafeDetail();
    return () => console.log('cafe detail Unmount');
  }, []);

  const [cafeDetail, getCafeDetail] = useState({});
  const [customerLikeShop, setCustomerLikeShop] = useState({});
  const [cafeMenus, getCafeMenus] = useState([]);
  const [cafeImgList, setCafeImgList] = useState({});

  const {likeShopList, setLikeShopList} = useContext(MenuToCartContext);

  const setCafeDetail = async() => {
    console.log('get Cafe Detail');
    let JWTToken = await AsyncStorage.getItem('userToken');
    console.log(JWTToken);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/customer/shop/${route.params.id}`,
      { headers: {"Authorization" : `Bearer ${JWTToken}`}}
      );
      console.log(response.data);
      getCafeDetail(response.data);
      setCustomerLikeShop(response.data.customerLikeShop);
      const imgListTemp = response.data.imgUrlList.slice();
      setCafeImgList(imgListTemp)
      getCafeMenus(response.data.menuList.menuList);
      // console.log("카페 메뉴 리스트",cafeMenus[0].menuStatus);
    } catch (e) {
      console.log(e);
    }
  }

  const likeCafe = async() => {
    console.log(`${route.params.id}번 카페 좋아여`);
    let likecafelist = likeShopList.slice();
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/shop/${route.params.id}`, 
        {},
        { headers: {"Authorization" : `Bearer ${JWTToken}`}}
      );
      setCustomerLikeShop(true);
      console.log(response.data);
      likecafelist.push(response.data);
      setLikeShopList(likecafelist);
    } catch (e) {
      console.log(e);
    }
  }

  const unlikeCafe = async() => {
    console.log(`${route.params.id}번 카페 좋아요 취소`);
    let likecafelist = likeShopList.slice();
    let targetIndex = -1;
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/shop/${route.params.id}`,
        { headers: {"Authorization" : `Bearer ${JWTToken}`}}
      );
      setCustomerLikeShop(false);
      console.log(response.data);
      let target = response.data;
      for (var i=0;i<likecafelist.length;i++) {
        if (likecafelist[i].shop.id == target) {
          targetIndex = i;
        }
      }
      likecafelist.splice(targetIndex, 1);
      setLikeShopList(likecafelist);
    } catch (e) {
      console.log(e);
    }
  }

  function CafeMenuTab() {
    return (
      <ScrollView style={{ backgroundColor: 'white'}}>
        <StTab>
          {cafeMenus.map((cafeMenu, index) => (
            // === 메뉴별 Row =====
            <TouchableOpacity 
            disabled={cafeMenu.menuStatus === 'SOLD_OUT'}
            style={{ opacity: cafeMenu.menuStatus === 'SOLD_OUT'? 0.2 : 1 }}
            key={index} 
            onPress={() => 
              navigation.navigate('Cafemenu', {id: route.params.id, menuInfo: cafeMenu, shopName: route.params.name}
            )}
            >
              <Row3>
              <MenuImage 
                  style={{ position: 'absolute', left: '5%', top: '0%', marginTop:0, opacity: cafeMenu.menuStatus === 'SOLD_OUT'? 1 : 0 ,
                  alignSelf:'center', borderRadius: 0, width: 60, height: 60}} 
                  source={require('../../assets/icons/out-of-stock1.png')}/>
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
            <StIntro title>가게 소개 </StIntro>
            <StIntro style={{marginBottom: 5}}>{ cafeDetail.intro }</StIntro>
            <View style={{height: 150, marginRight: 50}}>
              <SliderBox sliderBoxHeight={150} sliderBoxWidth={50} images={cafeImgList}></SliderBox>
            </View>
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
                <StIntro> <IconImage source={require('../../assets/icons/instagram.png')} /> </StIntro>
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
        <ImageBackground resizeMode="cover" source={{uri : cafeImgList[0]}} style={{width: "100%", height: "100%"}}>
          {/* 가게 이름 및 전화 & 좋아요 */}
          <StCafeTitle>
            <StCafeTitleName>
              { cafeDetail.name }
            </StCafeTitleName>
            <Row1>
              <Row4>
                <TouchableOpacity onPress={()=>Linking.openURL(`tel:${cafeDetail.phone_number}`)} style={{flexDirection : "row", width: "100%", justifyContent: "center", alignItems: "center"}}>
                  <Image source={require('../../assets/icons/call.png')} style={{width: 24, height: 24}}></Image>
                  <StCafeTitleItem>전화</StCafeTitleItem>
                </TouchableOpacity>
              </Row4>
              <Row4>
                <TouchableOpacity onPress={customerLikeShop ? () => unlikeCafe() : () => likeCafe()} style={{flexDirection : "row", width: "100%", justifyContent: "center", alignItems: "center"}}>
                  <Image source={customerLikeShop ? require('../../assets/icons/like-active.png') : require('../../assets/icons/like-inactive.png')}
                  style={{width: 24, height: 24}}
                  >
                  </Image>
                  <StCafeTitleItem >좋아요</StCafeTitleItem>
                </TouchableOpacity>
              </Row4>
            </Row1>
          </StCafeTitle>
        
          {/* 메뉴/가게소개 Tab 및 스크롤 */}
          <Col2>
            <Tab.Navigator
              screenOptions={{
                tabBarPressColor: '#FF7F00',
              }}>
              <Tab.Screen name="메뉴 " component={CafeMenuTab}></Tab.Screen>
              <Tab.Screen name="가게소개 " component={CafeIntroTab}></Tab.Screen>
            </Tab.Navigator>
          </Col2>
        </ImageBackground>
      </View>
  );
}

export default Cafe;
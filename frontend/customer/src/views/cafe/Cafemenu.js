import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, Button, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { MenuToCartContext } from '../Main';


const SelectView = styled.View`
  flex-direction: row; 
  justify-content:flex-start;
  margin: 5px;
  margin-left: 5.5%;
`
const SelectViewExtra = styled.View`
  flex-direction: row; 
  margin: 5px;
  margin-left: 5.5%;
  margin-top: 0;
`
const SelectViewButtons = styled.View`
  flex-direction: row; 
  justify-content:center;
  margin: 5px;
`
const SelectViewContent = styled.View`
  flex:1;
  max-width: 100;
  align-items: center; 
  border-radius: 5px;
  border-width: 2px;
  margin: 5px;
`
const SelectPress = styled.TouchableOpacity`
  justify-content:center;
  align-items: center; 
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  border-width: 2px;
  border-color: #ff7f00;
  width:40%;
`
const SelectPressCount = styled.Pressable`
  justify-content:center;
  align-items: center; 
  margin: 5px;
  /* padding: 5px; */
  border-radius: 30px;
  border-width: 2px;
  border-color: #FF7F00;
  width: 12%;
`
const StText = styled.Text`
  font-family: 'InfinitySansR';
  padding: 15px;
  color: #000000;
  margin-top: 2.5px;
  text-align: center;
`
const StTextTitle = styled.Text`
  font-family: 'InfinitySansR';
  padding: 5px;
  color: #000000;
  font-size: 20px;
`
const MenuImage = styled.Image`
  width:150;
  height:150;
`

const IconImage = styled.Image`
  align-items: center;
  width: 40px;
  height: 40px;
`

const Cafemenu = ({ route }) => {

  const [count, setCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [extraForOrder, setExtraForOrder] = useState([]);
  const [sizes, setSize] = useState([]);
  const [menuSizeId, setSizeForOrder] = useState('');
  const [customerLikeMenu, setCustomerLikeMenu] = useState([])

  const [sizeIndex, setSizeIndex] = useState('');
  const [extraIndex, setExtraIndex] = useState('');

  const {cartListItems, setCartListItems, setShopName} = useContext(MenuToCartContext);

  useEffect(() => {
    console.log(' cafe menu mount');
    console.log(route.params.id);
    console.log(route.params.menuInfo.menuId);
    setCafeMenu();
    return () => console.log(' cafe menu Unmount!');
  }, []);

  const setCafeMenu = async() => {
    console.log('get Cafe Menu');
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/shop/${route.params.id}/menu/${route.params.menuInfo.menuId}`,
        { headers: {"Authorization" : `Bearer ${JWTToken}`}}
      );
      
      console.log(' data ', response.data);
      console.log('menuSizeList?: ', response.data.menuSizeList.menuSizeList);
      console.log('menuExtraList?: ', response.data.extraList.extraList);

      setCustomerLikeMenu(response.data.customerLikeMenu)
      setSize(response.data.menuSizeList.menuSizeList);
      setSizeForOrder(response.data.menuSizeList.menuSizeList[0].menuSizeId);
      setExtras(response.data.extraList.extraList);

      const arr1 = Array.from({length: sizes.length}, () => 0);
      setSizeIndex(arr1);
      const arr2 = Array.from({length: extras.length}, () => 0);
      setExtraIndex(arr2);

    } catch (e) {
      console.log(e);
    }
  }

  const getExtraList = (extraId, index) => {
    console.log(`${extraId} 추가`);
    let tmplist = extraForOrder;
    const fn = tmplist.indexOf(extraId);
    if (fn < 0) {
      tmplist.push(extraId);
      setExtraForOrder(tmplist);
    } else {
      tmplist.splice(fn, 1);
      setExtraForOrder(tmplist);
    }
    console.log(extraForOrder);
    let arr = extraIndex.slice();
    if (extraIndex[index]==1) {
      arr[index] = 0;
    } else {
      arr[index] = 1;
    }
    setExtraIndex(arr);
  }

  const getSize = (menuSizeId, index) => {
    console.log(`${menuSizeId} 사이즈 설정`);
    setSizeForOrder(menuSizeId);
    let arr = Array.from({length: sizes.length}, () => 0);
    for(var i=0; i<sizes.length; i++) {
      if (i==index) {
        arr[i] = 1
      } else {
        arr[i] = 0
      }
    }
    setSizeIndex(arr);
  }

  const addCart = async(item) => {
    console.log('카트에 추가!');
    console.log('넣어야할것 : 가게id, 상품, 개수');
    let tmp = JSON.parse(await AsyncStorage.getItem('cartList'));
    let cartlist = {items: []};
    let isSame = true;
    let tmpPrice = 0;
    let extraName = [];
    if (item.menuStatus=='SALE') { // 해당 상품이 판매가능 
      for (var i=0; i < extraForOrder.length; i++) {
        extraForOrder[i];
        for (var j=0; j < extras.length; j++) {
          if (extraForOrder[i] == extras[j].extraId) {
            tmpPrice = tmpPrice + extras[j].price;
            extraName.push(extras[j].name);
          }
        }
      }
      for (var k=0; k < sizes.length; k++) {
        if (menuSizeId == sizes[k].menuSizeId) {
          tmpPrice = tmpPrice + sizes[k].price;
        }
      }
      if (tmp) { // 담아둔게 이미 하나 이상 있는 경우
        let cartlistall = tmp.items;
        if (cartlistall[0].cafeId == route.params.id) { // 그 담아둔 것이 지금 가게랑 같다면?
          let tmpextralist1 = [];
          let tmpextralist2 = [];
          cartlistall.forEach((val, index) => {
            tmpextralist1 = val.extraIdList.slice();
            tmpextralist2 = extraForOrder.slice();
            tmpextralist1.sort();
            tmpextralist2.sort();
            if (val.cafeId == route.params.id && val.menuId == route.params.menuInfo.menuId && val.menuSizeId == menuSizeId && JSON.stringify(tmpextralist1) == JSON.stringify(tmpextralist2)) { // 중복되는 물품이 있다면 합체
              console.log('중복0');
              val.count = val.count + count;
              isSame = false;
              return false;
            }
          });
          if (isSame) {
            cartlistall.push({
              cafeId: route.params.id, 
              item, 
              count, 
              menuId: route.params.menuInfo.menuId, 
              extraIdList: extraForOrder, 
              menuSizeId:menuSizeId, 
              shopName: route.params.shopName, 
              addPrice:tmpPrice, extraName 
            });
            isSame = true;
          }
          alert(`장바구니에 ${route.params.menuInfo.name} ${count}개 더 추가`);
          cartlist = {items: cartlistall};
        } else { // 담아둔 것이 지금 가게랑 다르면? 기존거 없애고 새걸로 업데이트
          alert('현재 카페의 상품으로 초기화합니다!');
          cartlist = {items: [{
            cafeId: route.params.id, 
            item, 
            count, 
            menuId: route.params.menuInfo.menuId, 
            extraIdList: extraForOrder, 
            menuSizeId:menuSizeId, 
            shopName: route.params.shopName, 
            addPrice:tmpPrice, 
            extraName 
          }]}
        }
      } else {  // 담아둔게 하나도 없다면 바로 넣기
        alert(`장바구니에 ${route.params.menuInfo.name} 추가`);
        cartlist = {items: [{
          cafeId: route.params.id, 
          item, 
          count, 
          menuId: route.params.menuInfo.menuId, 
          extraIdList: extraForOrder, 
          menuSizeId: menuSizeId, 
          shopName: route.params.shopName, 
          addPrice: tmpPrice, 
          extraName 
        }]}
      }
      await AsyncStorage.setItem('cartList', JSON.stringify(cartlist));
      setCartListItems(cartlist.items);
      setShopName(route.params.shopName);
    } else { // 해당 상품이 판매 불가능
      alert('현재 판매 불가능한 상품입니다!');
    }
  }

  const likeMenu = async() => {
    console.log(`${route.params.menuInfo.menuId}번 메뉴 좋아여`);
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/menu/${route.params.menuInfo.menuId}`, 
        {},
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      setCustomerLikeMenu(true);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  const unLikeMenu = async() => {
    console.log(`${route.params.menuInfo.menuId}번 메뉴 좋아요 취소 !!`);
    let JWTToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/customer/favorites/menu/${route.params.menuInfo.menuId}`,
        { headers: {"Authorization" : `Bearer ${JWTToken}`} }
      );
      setCustomerLikeMenu(false);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <ScrollView style={{ backgroundColor: '#ffffff', padding:20}}>
        <View style={{alignItems: 'center'}}>
          <MenuImage 
            source={{uri: route.params.menuInfo.imgUrl }} 
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <StTextTitle style={{ fontFamily: 'InfinitySans-Bold'}}>{ route.params.menuInfo.name }</StTextTitle>
          <StTextTitle style={{ fontSize: 15 }}>{ route.params.menuInfo.price }원</StTextTitle>
        </View>
        <StText style={{ textAlign: 'left', paddingBottom: 5}}>사이즈</StText>
        <SelectView>
          {sizes.map((size, index) => (
            <SelectViewContent style={{ borderColor: sizeIndex[index] ? '#ff7f00':'#cacaca' }} key={index} >
              <Pressable style={{alignItems: 'center', paddingTop:10 }} onPress={() => getSize(size.menuSizeId, index)}>
                <View style={{ height: 55, paddingBottom:0, paddingTop: 8, alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/icons/coffee-active.png')} 
                    style={{ width:50, height: (50 + size.price / 100) }}
                  />
                </View>
                <StText>+ { size.price }원</StText>
              </Pressable>
            </SelectViewContent>
          ))}
        </SelectView>

        <StText style={{ textAlign: 'left', paddingBottom: 5 }}>추가 옵션</StText>
        <SelectViewExtra>
          {extras.map((extra, index) => (
            <SelectViewContent style={{ borderColor: extraIndex[index] ? '#ff7f00':'#cacaca' }} key={index} >
              <Pressable onPress={() => getExtraList(extra.extraId, index)}>
                <StText>{ extra.name }</StText>
                <StText>+ { extra.price }원</StText>
              </Pressable>
            </SelectViewContent>
          ))}
        </SelectViewExtra>

        <SelectViewButtons>
          <SelectPressCount onPress={() => setCount(count-1)}>
            <Text style={{ fontSize: 30}}>-</Text>
          </SelectPressCount>
          <StText style={{ fontSize: 18}}>{ count }</StText>
          <SelectPressCount onPress={() => setCount(count+1)}>
            <Text style={{ fontSize: 18}}>+</Text>
          </SelectPressCount>
        </SelectViewButtons>

        <SelectViewButtons>
          <SelectPress style={{ borderColor: 'white'}} onPress={customerLikeMenu == false ? () => likeMenu() : () => unLikeMenu()}>
            <IconImage source={ customerLikeMenu == false ? require('../../assets/icons/like-inactive.png') : require('../../assets/icons/like-active.png')}></IconImage>
            <StText style={{ marginTop: 2, paddingTop: 0 }}>찜~!</StText>
          </SelectPress>
          <SelectPress style={{ borderColor: 'white'}} onPress={() => addCart(route.params.menuInfo)}>
          <IconImage source={require('../../assets/icons/addcart.png')}></IconImage>
            <StText style={{ marginTop: 2, paddingTop: 0 }}>장바구니 추가</StText>
          </SelectPress>
        </SelectViewButtons>
        <View><Text style={{height: 30, color: '#ffffff'}}>dd</Text></View>
      </ScrollView>
  );
}


export default Cafemenu;
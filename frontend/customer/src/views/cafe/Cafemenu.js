import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cafemenu = ({ route }) => {

  const [count, setCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [extraForOrder, setExtraForOrder] = useState([]);
  const [sizes, setSize] = useState([]);
  const [menuSizeId, setSizeForOrder] = useState('');

  const [sizeIndex, setSizeIndex] = useState('');
  const [extraIndex, setExtraIndex] = useState('');

  useEffect(() => {
    console.log(' cafe menu mount');
    console.log(route.params.id);
    console.log(route.params.menuInfo.menuId);
    setCafeMenu();
    return () => console.log(' cafe menu Unmount!');
  }, []);

  const setCafeMenu = async() => {
    console.log('get Cafe Menu');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/shop/${route.params.id}/menu/${route.params.menuInfo.menuId}`
      );
      console.log(response.data.menuSizeList.menuSizeList);
      setSize(response.data.menuSizeList.menuSizeList);
      setSizeForOrder(response.data.menuSizeList.menuSizeList[0].menuSizeId);
      console.log(response.data.extraList.extraList);
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
    if (item.menuStatus=='SALE') { // 해당 상품이 판매가능
      if (tmp) { // 담아둔게 이미 하나 이상 있는 경우
        let cartlistall = tmp.items;
        if (cartlistall[0].cafeId == route.params.id) { // 그 담아둔 것이 지금 가게랑 같다면?
          cartlistall.forEach((val, index) => {
            if (val.cafeId == route.params.id && val.menuId == route.params.menuInfo.menuId) { // 중복되는 물품이 있다면 합체
              console.log('중복0');
              val.count = val.count + count;
              isSame = false;
              return false;
            }
          });
          if (isSame) {
            cartlistall.push({cafeId: route.params.id, item, count, menuId: route.params.menuInfo.menuId, extraIdList: extraForOrder, menuSizeId });
            isSame = true;
          }
          alert(`장바구니에 ${route.params.menuInfo.name} ${count}개 더 추가`);
          cartlist = {items: cartlistall};
        } else { // 담아둔 것이 지금 가게랑 다르면? 기존거 없애고 새걸로 업데이트
          alert('현재 카페의 상품으로 초기화합니다!');
          cartlist = {items: [{cafeId: route.params.id, item, count, menuId: route.params.menuInfo.menuId, extraIdList: extraForOrder, menuSizeId }]}
        }
      } else {  // 담아둔게 하나도 없다면 바로 넣기
        alert(`장바구니에 ${route.params.menuInfo.name} 추가`);
        cartlist = {items: [{cafeId: route.params.id, item, count, menuId: route.params.menuInfo.menuId, extraIdList: extraForOrder, menuSizeId }]}
      }
      await AsyncStorage.setItem('cartList', JSON.stringify(cartlist));
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
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image 
            source={{uri: route.params.menuInfo.imgUrl }} 
            style={{width:300, height:300}} 
          />
        </View>

        <Text>{ route.params.menuInfo.price }</Text>
        <Text>{ route.params.menuInfo.name }</Text>
        <Text>{ route.params.menuInfo.menuStatus }</Text>

        <View>
          {sizes.map((size, index) => (
            <Pressable key={index} onPress={() => getSize(size.menuSizeId, index)}>
              <Text style={{backgroundColor: sizeIndex[index] == 1 ? 'green':'yellow'}}> 사이즈업 : { size.price } </Text>
            </Pressable>
          ))}
        </View>

        <Text></Text>

        <View>
          {extras.map((extra, index) => (
            <Pressable key={index} onPress={() => getExtraList(extra.extraId, index)}>
              <Text style={{backgroundColor: extraIndex[index] ? 'green':'yellow'}}>{ extra.name } : { extra.price }</Text>
            </Pressable>
          ))}
        </View>

        <Text></Text>
        <Button title="-1" onPress={() => setCount(count-1)}></Button>
        <Text>{ count }</Text>
        <Button title="+1" onPress={() => setCount(count+1)}></Button>
        <Button title="장바구니에 추가하기!" onPress={() => addCart(route.params.menuInfo)}></Button>
        <Text> </Text>
        <Button title='좋아요~' onPress={() => likeMenu()}></Button>
        
      </ScrollView>
  );
}


export default Cafemenu;
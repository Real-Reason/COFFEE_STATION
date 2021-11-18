import React, { useEffect, useState } from 'react';
import {View, Text, Button, TextInput, Pressable, Image } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const CreateMenuView = styled.View`
  flex: 1;
  align-items: center;
  background-color: #ffffff;
`
const Row = styled.View`
  flex-direction: row;
  padding: 30px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
  border: #cacaca 0.2px;
  width: 100%;
  margin-bottom: 5px;
`
const ColCategory = styled.View`
  justify-content: center;
  flex-direction: column;
  width: 20%;
`
const ColSize = styled.View`
  justify-content: center;
  flex-direction: column;
  width: 10%;
`
const Col = styled.View`
  justify-content: center;
  flex-direction: column;
  width: 50%;
`


const CreateMenu = ({navigation}) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [imgUrl, setImgUrl] = useState('https://reactnative.dev/img/tiny_logo.png');
  const [signiture, setSigniture] = useState(false);
  const [menuImage, setMenuImage] = useState();
  const [isResist, setIsResist] = useState(false);
  const [menuId, setMenuId] = useState(0);
  const [isMenuResist, setIsMenuResist] = useState([false, false, false, false, false, false, false]);
  const [extraName, setExtraName] = useState('');
  const [extraPrice, setExtraPrice] = useState('');
  const [extraList, setExtraList] = useState([]);

  const categoryIdName = ['Coffee', 'Non-Coffee', 'Dessert', 'Bakery', 'ETC'];
  const menuSizePrice = [0, 300, 500, 800, 1000, 1200, 1500];
  const menuSizeName = ['one size', 'Small', 'Medium', 'Large', 'Tall', 'Grande', 'Venti'];
  
  const formData = new FormData();

  const setImage = () => {
    launchImageLibrary({}, response => {
      console.log(response)
      setMenuImage(response.assets[0].uri);
      const file = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      };
      formData.append('images', file);
      // console.log('이게 폼데이타야');
      // console.log(formData);
      uploadImage();
    });
  };
  const uploadImage = async () => {
    try {
      const response = await axios.post(
        BASE_URL + `/menu/image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      setImgUrl(response.data);
    } catch (e) {
      console.log('아오');
      console.log(e);
    }
  };

  const addMenu = async() => {
    console.log('메뉴추가요');
    try {
      let userToken = await AsyncStorage.getItem('userToken');
      const response = await axios.post(
        BASE_URL + `/menu`,
        {categoryId, imgUrl, name, price, signiture},
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      console.log(response.data);
      setMenuId(response.data.menuId);
      setIsResist(true);
    } catch (e) {
      console.log(e);
    }
  }

  const resistSize = async(sizeId, price) => {
    let userToken = await AsyncStorage.getItem('userToken');
    let resist = isMenuResist.slice();
    if (resist[sizeId-1]) {
      console.log('메뉴 사이즈 삭제');
      try {
        const response = await axios.delete(
          BASE_URL + `/menu/${menuId}/size/${sizeId}`,
          {menuId, sizeId},
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          },
        );
        console.log(response.data);
        resist[sizeId-1] = false;
      } catch (e) {
        console.log(e);
      }
      resist[sizeId-1] = false;
    } else {
      console.log('메뉴 사이즈 등록');
      try {
        const response = await axios.post(
          BASE_URL + `/menu/${menuId}/size`,
          {price, sizeId},
          {
            headers: {
              Authorization: 'Bearer ' + userToken,
            },
          },
        );
        console.log(response.data);
        resist[sizeId-1] = true;
      } catch (e) {
        console.log(e);
      }
    }
    setIsMenuResist(resist);
  }

  const resistExtra = async() => {
    console.log('메뉴 추가사항 등록');
    let userToken = await AsyncStorage.getItem('userToken');
    let extratmp = extraList.slice();
    try {
      const response = await axios.post(
        BASE_URL + `/menu/${menuId}/extra`,
        {name:extraName, price:extraPrice},
        {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        },
      );
      console.log(response.data);
      extratmp.push({name:extraName, price:extraPrice});
      setExtraList(extratmp);
      setExtraName('');
      setExtraPrice('');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <CreateMenuView>
      <Row>
        <Col> 
          <Text>CreateMenu</Text>
            <Text>메뉴이름</Text>
            <TextInput 
              value={name}
              onChangeText={setName}
              style={{ borderColor:'black', borderWidth:2 }}
            />
            <Text>{name}</Text>
            <Text>메뉴가격</Text>
            <TextInput 
              value={price}
              onChangeText={setPrice}
              style={{ borderColor:'black', borderWidth:2 }}
            />
            <Text>{price}</Text>
            <Pressable
              style={{height: 200, width: 200, backgroundColor: '#ffffff', alignItems: 'center'}}
              onPress={() => setImage()}
            >
              <Image 
                style={{height: 180, width: 180}}
                source={{uri: imgUrl}}
              />
              <Text>메뉴 이미지 업로드</Text>
            </Pressable>
          <Row>
            {categoryIdName.map((cName, index) => (
              <ColCategory key={index} style={{ backgroundColor: index+1 == categoryId ? '#ff7f00':'#cacaca' }}>
                <Pressable onPress={() => setCategoryId(index+1)}>
                  <Text>{ cName }</Text>
                </Pressable>
              </ColCategory>
            ))}
          </Row>
          <Pressable onPress={() => setSigniture(!signiture)}>
            <Text>is Signiture?</Text>
          </Pressable>
          <Button title="메뉴등록" onPress={() => addMenu()} />
          {
            isResist
            ? (<Text>등록 완료! 이어서 사이즈와 추가사항을 넣어주세요!</Text>)
            : (<Text>메뉴 등록 먼저!</Text>)
          }
        </Col>

        <Col>
          <Text>사이즈랑 엑스트라 올 곳</Text>
          <Text>사이즈 등록</Text>
          <Row>
            {menuSizeName.map((sName, index) => (
              <ColSize key={index} style={{ backgroundColor: isMenuResist[index] ? '#ff7f00':'#cacaca' }}>
                <Pressable onPress={() => resistSize(index+1, menuSizePrice[index])}>
                  <Text>{sName}</Text>
                </Pressable>
              </ColSize>
            ))}
          </Row>
          <Text>메뉴 추가 사항 등록</Text>
          <Text>추가사항 명</Text>
          <TextInput 
            value={extraName}
            onChangeText={setExtraName}
            style={{ borderColor:'black', borderWidth:2 }}
          />
          <Text>{extraName}</Text>
          <Text>추가사항 가격</Text>
          <TextInput 
            value={extraPrice}
            onChangeText={setExtraPrice}
            style={{ borderColor:'black', borderWidth:2 }}
          />
          <Text>{extraPrice}</Text>
          <Button title="추가사항등록" onPress={() => resistExtra()} />
          {extraList.map((extrainfo, index) => (
            <Text key={index}>{extrainfo.name} : {extrainfo.price}</Text>
          ))}
        </Col>

      </Row>
      
      {/* <Button
        onPress={() => navigation.navigate('TabDone')}
        title="Go to TabDone"
      /> */}
    </CreateMenuView>
  );
};

export default CreateMenu;

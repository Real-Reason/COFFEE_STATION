import React, { useState } from 'react';
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
const Col = styled.View`
  justify-content: center;
  flex-direction: column;
  width: 20%;
`


const CreateMenu = ({navigation}) => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [imgUrl, setImgUrl] = useState('https://reactnative.dev/img/tiny_logo.png');
  const [signiture, setSigniture] = useState(false);
  const [menuImage, setMenuImage] = useState();

  const [menuId, setMenuId] = useState(0);
  
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
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <CreateMenuView>
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
        style={{height: 200, width: 200, backgroundColor: 'red'}}
        onPress={() => setImage()}
      >
        <Image 
          style={{height: 100, width: 100}}
          source={{uri: imgUrl}}
        />
        <Text>이미지올리기</Text>
      </Pressable>

      <Row>
        <Col>
          <Pressable onPress={() => setCategoryId(1)}>
            <Text>Coffee</Text>
          </Pressable>
        </Col>
        <Col>
          <Pressable onPress={() => setCategoryId(2)}>
            <Text>Non - Coffee</Text>
          </Pressable>
        </Col>
        <Col>
          <Pressable onPress={() => setCategoryId(3)}>
            <Text>Dessert</Text>
          </Pressable>
        </Col>
        <Col>
          <Pressable onPress={() => setCategoryId(4)}>
            <Text>Bakery</Text>
          </Pressable>
        </Col>
        <Col>
          <Pressable onPress={() => setCategoryId(5)}>
            <Text>ETC</Text>
          </Pressable>
        </Col>
      </Row>

      <Pressable onPress={() => setSigniture(!signiture)}>
        <Text>is Signiture?</Text>
      </Pressable>

      <Button title="메뉴등록" onPress={() => addMenu()} />
      
      {/* <Button
        onPress={() => navigation.navigate('TabDone')}
        title="Go to TabDone"
      /> */}
    </CreateMenuView>
  );
};

export default CreateMenu;

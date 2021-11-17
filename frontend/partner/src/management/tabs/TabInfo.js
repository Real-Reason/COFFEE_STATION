import React, {useEffect, useState} from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';
import axios from 'axios';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const ImageContianer = styled(Container)`
  flex-direction: column;
  flex: 0.5;
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled(Container)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TabInfo = ({navigation}) => {
  const [shopInfo, setShopInfo] = useState([]);
  // shopinfo 받아오기
  const getShopInfo = async () => {
    try {
      const response = await axios.get(BASE_URL + '/shop');
      setShopInfo(response.data);
      console.log(shopInfo);
    } catch (e) {
      console.log(e);
    }
  };
  // 샵 이미지 추가하기
  const [shopImage, setShopImage] = useState();
  // 카메라로 찍어서 올리기
  // const addImage = () => {
  //   launchCamera({}, response => {
  //     console.log(response);
  //     setShopImage(response.uri);
  //   });
  // };
  // const pickImage = () => {
  //   launchImageLibrary({}, response => {
  //     setShopImage(response.assets[0].uri);
  //     console.log('됐다 이제', shopImage);
  //   });
  // };
  const formData = new FormData();
  const setImage = () => {
    launchImageLibrary({}, response => {
      setShopImage(response.assets[0].uri);
      const file = {
        uri: response.assets[0].uri,
        type: response.assets[0].type,
        name: response.assets[0].fileName,
      };
      formData.append('images', file);
      console.log('이게 폼데이타야');
      console.log(formData);
      uploadImage();
    });
  };
  const uploadImage = async () => {
    try {
      console.log(shopInfo.id);
      const response = await axios.post(
        BASE_URL + `/shop/${shopInfo.id}/images`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
    } catch (e) {
      console.log('아오');
      console.log(e);
    }
  };
  useEffect(() => {
    getShopInfo();
  }, []);

  return (
    <Container>
      <ImageContianer>
        {shopImage ? (
          <TouchableOpacity
            style={{height: 200, width: 200, backgroundColor: 'red'}}
            onPress={() => setImage()}>
            <Image
              style={{height: 200, width: 200}}
              source={{
                uri: shopImage,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{height: 200, width: 200}}
            onPress={() => setImage()}>
            <Image
              style={{height: 200, width: 200}}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </TouchableOpacity>
        )}
        <Text>{shopInfo.name}</Text>
        <Text>{shopInfo.instagram}</Text>
      </ImageContianer>
      <TextContainer>
        <Text>가게전화번호</Text>
        <Text>대표번호</Text>
        <Text>{shopInfo.phone_number}</Text>
        <Text>가게소개</Text>
        <Text>{shopInfo.intro}</Text>
        <Text>영업시간</Text>
        <Text>OPEN {shopInfo.open_at}</Text>
        <Text>CLOSE {shopInfo.close_at}</Text>
      </TextContainer>
    </Container>
  );
};

export default TabInfo;

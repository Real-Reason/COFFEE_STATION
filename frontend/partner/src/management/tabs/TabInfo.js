import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styled from 'styled-components/native';
import axios from 'axios';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  padding: 10px;

  /* border: 1px;
  border-color: orange; */
`;

const ImageContianer = styled(Container)`
  flex-direction: column;
  flex: 0.5;
  justify-content: center;
  align-items: center;

  /* border: 1px; */
`;

const TextContainer = styled(Container)`
  flex-direction: column;

  /* border: 1px ;
  border-color: red; */
`;

const Col1 = styled.View`
  width: 100%;
  padding: 10px;
  margin: 7px;

  border-radius: 5px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: ${props => (props.instagram ? 'center' : 'space-between')};
  align-items: center;
`;

const Image = styled.Image`
  width: ${props => (props.instagram ? '30px' : '250px')};
  height: ${props => (props.instagram ? '30px' : '250px')};
  border-radius: ${props => (props.instagram ? '0px' : '125px')};
`;

const StText = styled.Text`
  padding: 7px;
  font-size: ${props => (props.title ? '25px' : '20px')};
  font-family: ${props =>
    props.title
      ? 'InfinitySans-Bold'
      : props.price
      ? 'InfinitySans-Bold'
      : 'InfinitySansR'};
  color: black;
`;

const TabInfo = ({navigation}) => {
  const [shopInfo, setShopInfo] = useState([]);
  const [shopImageList, setShopImageList] = useState([]);
  // shopinfo 받아오기
  const getShopInfo = async () => {
    try {
      const response = await axios.get(BASE_URL + '/shop');
      setShopInfo(response.data);
      setShopImageList(response.data.imgUrlList);
      console.log('요가역여ㅣ기', shopInfo);
    } catch (e) {
      console.log(e);
    }
  };
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
        console.log(response),
      );
      getShopInfo();
      // console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getShopInfo();
  }, []);

  return (
    <Container>
      <ImageContianer>
        {shopImageList.length === 0 ? (
          <TouchableOpacity style={{margin: 30}} onPress={() => setImage()}>
            <Image source={require('../../assets/icons/add-image.png')} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{margin: 30}} onPress={() => setImage()}>
            <Image
              source={{
                uri: shopImageList[shopImageList.length - 1],
              }}
            />
          </TouchableOpacity>
        )}
        <StText title>가게명 : {shopInfo.name}</StText>
        <Row instagram>
          <Image
            instagram
            source={require('../../assets/carousel/instagram.png')}></Image>
          <StText title>Instagram : {shopInfo.instagram}</StText>
        </Row>
      </ImageContianer>

      <TextContainer>
        <Col1>
          <Row>
            <StText title>가게전화번호</StText>
            <StText style={{color: '#3c69c2'}}>수정🖋</StText>
          </Row>
          <StText>대표번호</StText>
          <StText>{shopInfo.phone_number}</StText>
        </Col1>
        <Col1>
          <Row>
            <StText title>가게소개</StText>
            <StText style={{color: '#3c69c2'}}>수정🖋</StText>
          </Row>
          <StText>{shopInfo.intro}</StText>
        </Col1>
        <Col1>
          <Row>
            <StText title>영업시간</StText>
            <StText style={{color: '#3c69c2'}}>수정🖋</StText>
          </Row>
          <StText>OPEN {shopInfo.open_at}</StText>
          <StText>CLOSE {shopInfo.close_at}</StText>
        </Col1>
        <Col1 style={{backgroundColor: '#D7DBE2'}}>
          <StText>👀👂🏻</StText>
          <StText title>우리 가게의 이런 모습을 소개해보세요.</StText>
          <StText>1. 위치, 인테리어 등 매장에 대한 정보</StText>
          <StText>2. 신메뉴, 재료, 조리과정 등 메뉴에 대한 정보</StText>
          <StText>3. 진행하고 있는 이벤트</StText>
        </Col1>
      </TextContainer>
    </Container>
  );
};

export default TabInfo;

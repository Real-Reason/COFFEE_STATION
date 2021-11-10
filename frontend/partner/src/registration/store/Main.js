import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {AuthContext} from '../../App';
const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.Text`
  font-size: 24px;
  padding: 10px;
  margin: 10px 0;
`;
const StyledImage = styled.Image`
  width: 200;
  height: 200;
`;
const StyledButton = styled.Button`
  font-size: 20px;
  padding: 10px;
  margin: 10px 0;
`;
// Carousel을 구현해보자.
// const screenWidth = Math.round(Dimensions.get('window').width)
// const Pages = [
//   {
//     num: 1,
//     color: '#86E3CE'
//   },
//   {
//     num: 2,
//     color: '#D0E6A5'
//   },
//   {
//     num: 3,
//     color: '#FFDD94'
//   },
//   {
//     num: 4,
//     color: '#FA897B'
//   },
//   {
//     num: 5,
//     color: '#CCABD8'
//   },
// ]
const Main = () => {
  return (
    <Container>
      <StyledText>똑똑한 테이크아웃을 위한 첫걸음</StyledText>
      <StyledText>COFFEE STATION이 도와드릴게요</StyledText>
      <StyledImage
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <StyledText>케로젤 자리</StyledText>
      <StyledButton title="가게 등록하기"></StyledButton>
    </Container>
  );
};

export default Main;

import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from '../../../App';

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
  width: 20px;
  height: 20px;
`;
const StyledButton = styled.Button`
  font-size: 20px;
  padding: 10px;
  margin: 10px 0;
`;

const Intro = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    console.log('INTRO');
  });
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
      <StyledButton
        title="가게 등록하기"
        onPress={() => navigation.navigate('AuthUser')}></StyledButton>
      <StyledButton title="Sign Out" onPress={() => signOut()}></StyledButton>
    </Container>
  );
};

export default Intro;

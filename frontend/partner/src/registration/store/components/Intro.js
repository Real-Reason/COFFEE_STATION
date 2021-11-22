import React, {useContext, useEffect} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from '../../../App';
import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Row = styled.View`
  margin: 10px;
  flex-direction: row;
  justify-content: ${props => props.btn ? "space-around" : "center"};
  width: 100%;

  /* border: 1px;
  border-color: red; */
`

const Container = styled.View`
  justify-content: space-between;
  /* align-items: center; */
`;

const StyledText = styled.Text`
  text-align: center;
  font-size: 24px;
  font-family: 'InfinitySansR';
  padding: 10px;
  color: ${props => props.btn ? "white" : "black"};

  /* border: 1px; */
`;
const StyledImage = styled.Image`
  width: 30%;

  /* border: 1px;
  border-color: orange; */
`;

const StBtnView = styled.View`
  width: 40%;
  border-radius: 30px;
  background-color: #FF7F00;
`

const Intro = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    console.log('INTRO');
  });
  return (
    <Container>
      <StyledText style={{marginTop: 20}}>똑똑한 테이크아웃을 위한 첫걸음</StyledText>
      <Row>
        <StyledImage
          source={{ uri: 'https://cdn.discordapp.com/attachments/880707219098853400/910537785419657246/t1.png'}}/>
        <StyledText>
          이 도와드릴게요
        </StyledText>
      </Row>

      <Container style={{height: "70%"}}>
        <SliderBox sliderBoxHeight={500} images={[
          require('../../../assets/carousel/1.jpg'),
          require('../../../assets/carousel/2.jpg'),
          require('../../../assets/carousel/3.jpg')
        ]}>
        </SliderBox>
      </Container>

      <Row btn>
        <StBtnView>
          <StyledText btn onPress={() => navigation.navigate('AuthUser')}>가게 등록하기</StyledText>
        </StBtnView>
        <StBtnView>
          <StyledText btn onPress={() => signOut()}>SIGN OUT</StyledText>
        </StBtnView>
      </Row>
    </Container>
  );
};

export default Intro;

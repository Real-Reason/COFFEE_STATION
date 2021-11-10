import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  /* align-items: center; */
`;
const StyledInput = styled.TextInput`
  border: 1px solid #111111;
  padding: 10px;
  margin: 10px 0;
  width: 200px;
  font-size: 24px;
`;
const StyledText = styled.Text`
  font-size: 24px;
  padding: 10px;
  margin: 10px 0;
`;
const RegisterBtn = styled.Button`
  border-width: 0;
  color: #ffffff;
`;

const AuthUser = ({navigation}) => {
  const [regiNum, setRegiNum] = useState('');
  const [shopName, setShopName] = useState('');

  const refRegiNum = useRef(null);
  const refShopName = useRef(null);

  return (
    <Container>
      <StyledText>사업자 등록번호</StyledText>
      <StyledInput
        value={regiNum}
        onChangeText={setRegiNum}
        ref={refRegiNum}
        returnKeyType="next"
        onSubmitEditing={() => refShopName.current.focus()}></StyledInput>
      <StyledText>상호</StyledText>
      <StyledInput
        value={shopName}
        onChangeText={setShopName}
        ref={refShopName}
        returnKeyType="done"></StyledInput>
      <StyledText>사업장 소재지</StyledText>
      <RegisterBtn
        title="다음"
        onPress={() => navigation.navigate('AuthUser')}></RegisterBtn>
    </Container>
  );
};

export default AuthUser;

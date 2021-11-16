import React, {useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 50px;
  background-color: white;
  border-radius: 5px;
  height: 100%;
  
`
const StTextInput = styled.TextInput`
  font-family: 'InfinitySansR';
  padding-left: 20px;
  margin-bottom: 5px;
  background-color: white;
  border-radius: 5px;
  border: #cacaca 1px;
`
const StPressable = styled.Pressable`
  background: black;
  margin-top: 2.5px;
  margin-bottom: 2.5px;
  border-radius: 5px;
  align-items: center;
`

const StText = styled.Text`
  font-family: 'InfinitySansR';
  padding: 15px;
  color: white;
  text-align: center;
  margin-bottom: 5px;
`

const StView = styled.View`
  background: white;
  height: 100%;
  padding: 50px;
`

const Signup = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const signUp = async() => {
    console.log('회원가입 시작');
    const data = {email, password, passwordConfirm, nickname}
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/customer/join`,
        data
      );
      console.log(response.data);
      // navigation.navigate('SignInScreen');
    }
    catch (e) {
      console.log('회원가입 실패')
      console.log(e);
    }
  }

  return (
    <StView>
      <StTextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <StTextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <StTextInput
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />
      <StTextInput
        placeholder="별명"
        value={nickname}
        onChangeText={setNickname}
      />
      <StPressable title="Sign UP" onPress={() => signUp()} >
        <StText>회원 가입</StText>  
      </StPressable>
      
    </StView>
  );
}

export default Signup;
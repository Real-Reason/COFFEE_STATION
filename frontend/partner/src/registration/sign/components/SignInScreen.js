import React, {useState, useContext, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from '../../../App';

const StyledInput = styled.TextInput`
  border: 1px solid #cacaca;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 24px;
  border-radius: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  font-size: 20px;
  padding: 10px;
  margin: 10px 0;
  border: 1px #ff7f00;
  border-radius: 10px;
`;

const StyledImage = styled.Image`
  align-self: center;
  margin: 5%;
  width: 60%;
  height: 20%;
`;

const Text = styled.Text`
  font-size: 30;
  align-self: center;
  color: #ff7f00;
`;
const View = styled.View`
  padding: 30px;
  width: 70%;
  align-self: center;
  background-color: white;
  height: 100%;
`;

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useContext를 사용해 AuthContext가 value로 가지고 있는 signIn
  const {signIn} = useContext(AuthContext);

  const refEmail = useRef(null);
  const refPassword = useRef(null);

  useEffect(() => {
    console.log('=-=-=-=-=-=- SignInScreen Mount =-=-=-=-=-=-');
    refEmail.current.focus();
  }, []);

  return (
    <View style={{width: '100%'}}>
      <View>
        <StyledImage source={require('../../../assets/logo/logo1.png')} />
        <StyledInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          ref={refEmail}
          returnKeyType="next"
          onSubmitEditing={() => refPassword.current.focus()}
        />
        <StyledInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          ref={refPassword}
          returnKeyType="done"
          secureTextEntry
        />
        <StyledButton
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}>
          <Text>회원가입</Text>
        </StyledButton>
        <StyledButton title="Sign in" onPress={() => signIn({email, password})}>
          <Text>로그인</Text>
        </StyledButton>
      </View>
    </View>
  );
};

export default SignInScreen;

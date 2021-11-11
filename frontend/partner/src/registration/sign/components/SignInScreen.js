import React, {useState, useContext, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {AuthContext} from '../../../App';

const StyledInput = styled.TextInput`
  border: 1px solid #111111;
  padding: 10px;
  margin: 10px 0;
  width: 200px;
  font-size: 24px;
`;
const StyledButton = styled.Button`
  font-size: 20px;
  padding: 10px;
  margin: 10px 0;
`;
const StyledImage = styled.Image`
  width: 50px;
  height: 50px;
`;
const SingUpButton = styled(StyledButton)`
  border-width: 0;
  color: #ffffff;
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
    <>
      <StyledImage
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
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
      <SingUpButton
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
      <StyledButton title="Sign in" onPress={() => signIn({email, password})} />
    </>
  );
};

export default SignInScreen;

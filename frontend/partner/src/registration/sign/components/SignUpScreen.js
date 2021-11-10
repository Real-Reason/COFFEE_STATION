import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import axios from 'axios';

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
  width: 50;
  height: 50;
`;

const SignUp = async data => {
  console.log('찍히고 있는거냐고');
  try {
    const response = await axios.post(
      'http://localhost:8080/api/partner/join',
      data,
    );
    console.log(response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Join Failed');
    }
  }
};

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);

  useEffect(() => {
    console.log('=-=-=-=-=-=- SignUpScreen Mount =-=-=-=-=-=-');
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
        returnKeyType="next"
        onSubmitEditing={() => refPasswordConfirm.current.focus()}
        secureTextEntry
      />
      <StyledInput
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        placeholder="PasswordConfirm"
        ref={refPasswordConfirm}
        returnKeyType="done"
        secureTextEntry
      />
      <StyledButton
        title="Sign Up"
        onPress={() => SignUp({email, password, passwordConfirm})}
      />
    </>
  );
};

export default SignUpScreen;

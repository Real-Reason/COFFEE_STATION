import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components/native';

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
        onPress={() => console.log('Sign Up Button pressed')}
      />
    </>
  );
};

export default SignUpScreen;

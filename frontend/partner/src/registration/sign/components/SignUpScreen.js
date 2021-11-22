import React, {useState, useRef, useEffect, useContext} from 'react';
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
  border: 1px #FF7F00;
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
  color: #FF7F00;
`
const View =styled.View`
  padding: 30px;
  width: 70%;
  align-self: center;
  background-color: white;
  height: 100%;
`

const SignUpScreen = navigation => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const {signUp} = useContext(AuthContext);

  // const handleSignUp = () => {
  //   try {
  //     signUp({email, password, passwordConfirm});
  //     // navigation.navigate('SignIn');
  //   } catch (error) {
  //     alert('회원가입 실패');
  //   }
  // };

  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const refPasswordConfirm = useRef(null);

  useEffect(() => {
    console.log('=-=-=-=-=-=- SignUpScreen Mount =-=-=-=-=-=-');
    refEmail.current.focus();
  }, []);

  return (
    <View style={{ width: "100%"}}>
      <View>
        <StyledImage
          source={require('../../../assets/logo/logo1.png')}
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
          onPress={() => signUp({email, password, passwordConfirm})}>
          <Text>회원가입</Text>
        </StyledButton>
      </View>
    </View>
  );
};

export default SignUpScreen;

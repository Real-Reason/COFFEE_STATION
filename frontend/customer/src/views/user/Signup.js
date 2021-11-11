import React, {useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

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
        `http://3.38.99.110:8080/api/customer/join`,
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
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="PasswordConfirm"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
      />
      <TextInput
        placeholder="nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="Sign UP" onPress={() => signUp()} />
      
      <Text>SignUp</Text>
    </View>
  );
}

export default Signup;
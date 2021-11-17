import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../App';


const Mypage = () => {
  
  const { signOut } = useContext(AuthContext);

  return (
      <View>
        <Text>Mypage</Text>
        <Button title="로그아웃" onPress={() => signOut()}></Button>
      </View>
  );
}

export default Mypage;
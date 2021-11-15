import * as React from 'react';
import {useContext} from 'react';
import {Text, Pressable, View, Button} from 'react-native';
import {AuthContext} from '../App';

const ManageMain = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <View style={{width: 200, height: '100%', backgroundColor: 'red'}}>
      <Text>ManageMain</Text>
      <Button title="signout" onPress={() => signOut()}></Button>
    </View>
  );
};

export default ManageMain;

import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../App';

const ManageMain = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <View>
      <Text>ManageMain</Text>
      <Button title="signout" onPress={() => signOut()}></Button>
    </View>
  );
};

export default ManageMain;

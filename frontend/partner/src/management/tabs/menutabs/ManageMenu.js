import React from 'react';
import {View, Text, Button} from 'react-native';

const ManageMenu = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>ManageMenu</Text>
      {/* <Button
        onPress={() => navigation.navigate('TabDone')}
        title="Go to TabDone"
      /> */}
    </View>
  );
};

export default ManageMenu;

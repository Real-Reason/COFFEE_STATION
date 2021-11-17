import React from 'react';
import {View, Text, Button} from 'react-native';

const CreateMenu = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>CreateMenu</Text>
      {/* <Button
        onPress={() => navigation.navigate('TabDone')}
        title="Go to TabDone"
      /> */}
    </View>
  );
};

export default CreateMenu;

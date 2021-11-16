import React from 'react';
import {View, Text, Button} from 'react-native';

const TabDone = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>TabDone</Text>
      <Button
        onPress={() => navigation.navigate('TabInfo')}
        title="Go to TabInfo"
      />
    </View>
  );
};

export default TabDone;

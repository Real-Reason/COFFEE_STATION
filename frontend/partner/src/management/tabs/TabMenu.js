import React from 'react';
import {View, Text, Button} from 'react-native';

const TabMenu = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>TabMenu</Text>
      <Button
        onPress={() => navigation.navigate('TabProgress')}
        title="Go to TabProgress"
      />
    </View>
  );
};

export default TabMenu;

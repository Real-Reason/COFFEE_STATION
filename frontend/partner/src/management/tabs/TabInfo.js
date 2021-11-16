import React from 'react';
import {View, Text, Button} from 'react-native';

const TabInfo = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>TabInfo</Text>
      <Button
        onPress={() => navigation.navigate('TabMenu')}
        title="Go to TabMenu"
      />
    </View>
  );
};

export default TabInfo;

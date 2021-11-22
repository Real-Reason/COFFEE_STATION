import React from 'react';
import {View, Text, Button} from 'react-native';

const TabRevenue = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>TabRevenue</Text>
      <Button
        onPress={() => navigation.navigate('TabDone')}
        title="Go to TabDone"
      />
    </View>
  );
};

export default TabRevenue;

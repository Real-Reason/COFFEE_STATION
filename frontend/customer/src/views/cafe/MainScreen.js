import React from 'react';
import { View, Text } from 'react-native';

const MainScreen = () => {
  return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text>MainScreen</Text>
      </View>
  );
}

export default MainScreen;
import React from 'react';
import { View, Text } from 'react-native';

const MainScreen = () => {
  useEffect(() => {
    console.log(' main screen mount');
    return () => console.log('main screen Unmount');
  }, []);

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
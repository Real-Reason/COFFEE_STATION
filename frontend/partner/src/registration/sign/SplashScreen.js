import React from "react";
import {View, ActivityIndicator} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{ alignItems:'center', justifyContent:'center' }}>
      <ActivityIndicator size="large" color="#ff7f00" />
    </View>
  );
};
  
export default SplashScreen

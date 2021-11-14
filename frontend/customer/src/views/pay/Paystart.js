import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';


const Paystart = ({ route }) => {

  useEffect(() => {
    console.log(route.params);
  }, []);

  return (
    <WebView
      source={{ uri: 'https://www.naver.com' }}
      style={{ marginTop: 20 }}
    />
  );
}

export default Paystart;
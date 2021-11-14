import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';


const Paystart = ({ navigation, route }) => {

  useEffect(() => {
    console.log(route.params);
  }, []);


  const runTimeout = `
    setTimeout(function () {
      window.ReactNativeWebView.postMessage(document.location.href)
    }, 2000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const goPayEnd = (payMessage) => {
    navigation.navigate('Payend', payMessage);
  }

  return (
    <WebView
      source={{ uri: route.params.success_url }}
      injectedJavaScript={runTimeout}
      onMessage={(event) => {alert(event.nativeEvent.data)}}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        // console.warn('WebView error: ', nativeEvent);
        goPayEnd(nativeEvent)
      }}
    />
  );
}

export default Paystart;
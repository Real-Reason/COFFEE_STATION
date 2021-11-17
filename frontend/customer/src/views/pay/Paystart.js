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
    }, 200000);
    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const goPayEnd = (payMessage) => {
    const payComplete = {
      cid: 'TC0ONETIME',
      tid: route.params.paysuccess.tid,
      partner_order_id: route.params.partner_order_id,
      partner_user_id: route.params.partner_user_id,
    }
    navigation.navigate('Paying', { payComplete, payMessage });
  }

  return (
    <WebView
      source={{ uri: route.params.paysuccess.success_url }}
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
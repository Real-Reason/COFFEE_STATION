import { WebView } from "react-native-webview";
import React from 'react';

const Maps = () => {
  const mapapi = '<h1>야임마</h1><div id="map" style="width:500px;height:400px;"></div><script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5807a5ed1c878ce977d15e990346f9eb"></script><script>var container = document.getElementById("map");var options = {center: new kakao.maps.LatLng(33.450701, 126.570667),mlevel: 3};var map = new kakao.maps.Map(container, options);</script>'

  return (
    // <WebView
    //   originWhitelist={['*']}
    //   source={{html: '<h1>Hello world</h1>'}}
    // />
    <WebView
    source={{html: mapapi}}
    style={{marginTop: 20}}
  />
  );
}

export default Maps
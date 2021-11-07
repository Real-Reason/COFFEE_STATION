import { WebView } from "react-native-webview";
import React from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";

// const Maps = () => {
//   const mapapi = '<h1>야임마</h1><div id="map" style="width:500px;height:400px;"></div><script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5807a5ed1c878ce977d15e990346f9eb"></script><script>var container = document.getElementById("map");var options = {center: new kakao.maps.LatLng(33.450701, 126.570667),mlevel: 3};var map = new kakao.maps.Map(container, options);</script>'

//   return (
//     // <WebView
//     //   originWhitelist={['*']}
//     //   source={{html: '<h1>Hello world</h1>'}}
//     // />
//     <WebView
//     source={{html: mapapi}}
//     style={{marginTop: 20}}
//   />
//   );
// }

const Maps = () => {
  const P0 = {latitude: 37.564362, longitude: 126.977011};
  const P1 = {latitude: 37.565051, longitude: 126.978567};
  const P2 = {latitude: 37.565383, longitude: 126.976292};

  return (
    <NaverMapView
    style={{width: '100%', height: '100%'}}
    showsMyLocationButton={true}
    center={{...P0, zoom: 16}}
    onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
    onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
    onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
    >
      <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
      <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
      <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/>
      <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
      <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
      <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
      <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/>
    </NaverMapView>
  );
}

export default Maps
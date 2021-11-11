import React, { useEffect, useState } from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";



const Maps = ({ navigation, route }) => {

  const pointList = [{id: 1, latitude: 37.564362, longitude: 126.977011}, {id: 2, latitude: 37.565051, longitude: 126.978567}, {id: 3, latitude: 37.565383, longitude: 126.976292}];

  const [mypoints, setMypoint] = useState([])

  useEffect(() => {
    console.log(' map mount');
    console.log(route.params.cafeList)
    setMypoint(route.params.cafeList)
    return () => console.log('map Unmount');
  }, []);

  const goCafeDetail = (point) => {
    console.log('카페상세로 이동하기');
    navigation.navigate('Cafe', point)
  }

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{latitude: route.params.mypoint.y, longitude: route.params.mypoint.x, zoom: 16}}
      onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
    >
      {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
      <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
      <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/> */}

      {pointList.map((point, index) => (
        <Marker key={index} coordinate={point} onClick={() => goCafeDetail(point)}></Marker>
      ))}
      {mypoints.map((point, index) => (
        <Marker key={index} coordinate={{longitude: point.lat, latitude: point.lng}} onClick={() => goCafeDetail(point)}></Marker>
      ))}
      
      {/* { isload ? ( <Text>null</Text> ) : ( <Text>true</Text> ) } */}

      {/* <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
      <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
      <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
      <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/> */}
    </NaverMapView>
  );
}

export default Maps
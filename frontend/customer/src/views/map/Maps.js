import React, { useEffect, useState } from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";



const Maps = ({ navigation, route }) => {


  const myPoint = {id: 1, latitude: 37.564362, longitude: 126.977011};
  const pointList = [{id: 1, latitude: 37.564362, longitude: 126.977011}, {id: 2, latitude: 37.565051, longitude: 126.978567}, {id: 3, latitude: 37.565383, longitude: 126.976292}];

  const [mypoint, setMypoint] = useState({})

  useEffect(() => {
    console.log(' map mount');
    console.log(route.params);
    const tmp = {latitude: route.params.mypoint.y, longitude: route.params.mypoint.x};
    console.log(tmp);
    // setMypoint(tmp)
    return () => console.log('map Unmount');
  }, []);

  const goCafeDetail = (point) => {
    console.log('카페상세로 이동하기');
    console.log('스택 네비게이터를 쓰고 온클릭시 네비게이션 이동?');
    console.log('이건 나중에 백엔드에서 어캐 정보가 오는지 알아야함');
    console.log(`onClick! ${point.latitude}, ${point.longitude}`)
    navigation.navigate('Cafe', point)
  }

  return (
    <NaverMapView
    style={{width: '100%', height: '100%'}}
    showsMyLocationButton={true}
    center={{...myPoint, zoom: 16}}
    onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
    onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
    onMapClick={e => console.log('onMapClick', JSON.stringify(e))}
    >
      {/* <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')}/>
      <Marker coordinate={P1} pinColor="blue" onClick={() => console.warn('onClick! p1')}/>
      <Marker coordinate={P2} pinColor="red" onClick={() => console.warn('onClick! p2')}/> */}

      {pointList.map(point => (
        <Marker coordinate={point} onClick={() => goCafeDetail(point)}></Marker>
      ))}

      {/* <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
      <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
      <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
      <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/> */}
    </NaverMapView>
  );
}

export default Maps
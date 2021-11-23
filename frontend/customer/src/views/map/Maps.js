import React, { useEffect, useState } from 'react';
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon, ImageBackground } from "react-native-nmap";
import { View, Text, Image } from 'react-native';



const Maps = ({ navigation, route }) => {

  const [mypoints, setMypoint] = useState([])

  useEffect(() => {
    console.log(' map mount');
    console.log('========== cafe list on map ==========')
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

      {/* {pointList.map((point, index) => (
        <Marker key={index} coordinate={point} onClick={() => goCafeDetail(point)}></Marker>
      ))} */}
      {mypoints.map((point, index) => (
        <Marker key={index} coordinate={{longitude: point.lat, latitude: point.lng}} onClick={() => goCafeDetail(point)} caption={{text:`${point.name}`, textSize:15 }}></Marker>
      ))}
      <Marker pinColor="red" coordinate={{longitude: route.params.mypoint.x, latitude: route.params.mypoint.y}} caption={{text:'현재 내 위치', textSize:15 }} ></Marker>
      
      {/* <Marker coordinate={{longitude: route.params.mypoint.x, latitude: route.params.mypoint.y}} width={120} height={120}>
        <View>
          <View style={{backgroundColor: 'white', borderWidth: 1, borderRadius: 20, borderColor: '#ff7f00', alignItems:'center'}}>
            <Image 
              style={{width: 100, height: 100}}
              source={{uri: 'https://cdn.discordapp.com/attachments/880707219098853400/910884675751407646/image_6.png'}}
            />
            <Text>현재 내 위치</Text>
          </View>
        </View>
      </Marker>  */}

      {/* { isload ? ( <Text>null</Text> ) : ( <Text>true</Text> ) } */}

      {/* <Path coordinates={[P0, P1]} onClick={() => console.warn('onClick! path')} width={10}/>
      <Polyline coordinates={[P1, P2]} onClick={() => console.warn('onClick! polyline')}/>
      <Circle coordinate={P0} color={"rgba(255,0,0,0.3)"} radius={200} onClick={() => console.warn('onClick! circle')}/>
      <Polygon coordinates={[P0, P1, P2]} color={`rgba(0, 0, 0, 0.5)`} onClick={() => console.warn('onClick! polygon')}/> */}
    </NaverMapView>
  );
}

export default Maps
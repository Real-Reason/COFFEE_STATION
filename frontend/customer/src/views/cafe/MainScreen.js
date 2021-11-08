import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Maps from '../map/Maps';


const Stack = createNativeStackNavigator();

const MainCafeList = ({ navigation }) => {
  const [cafeList, setCafeList] = useState('')

  const getInfo = () => {
    console.log('get카페리스트')
    // try {
    //   const response = axios.get('http://10.0.2.2:8080/api/customer/cafes');
    //   console.log(response);
    // }
    // catch (e) {
    //   console.logg(e);
    // }
  }

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLogitude] = useState(null);

  const geoLocation = () => {
      Geolocation.getCurrentPosition(
          position => {
              const latitude = JSON.stringify(position.coords.latitude);
              const longitude = JSON.stringify(position.coords.longitude);

              setLatitude(latitude);
              setLogitude(longitude);
          },
          error => { console.log(error.code, error.message); },
          {enableHighAccuracy:true, timeout: 15000, maximumAge: 10000 },
      )
  }

  useEffect(() => {
    console.log(' main screen mount');
    getInfo();
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
        <Button title="maps" onPress={() => navigation.navigate('Maps')}></Button>
        <Text>MainScreen</Text>
        <Pressable onPress={() => geoLocation()}>
            <Text> Get GeoLocation </Text>
        </Pressable>
        <Text> latitude?: {latitude} </Text>
        <Text> longitude?: {longitude} </Text>
      </View>
  );
}


const MainScreen = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen name="MainCafeList" component={MainCafeList} />
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
  );
}

export default MainScreen;
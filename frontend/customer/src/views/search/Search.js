import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Button } from 'react-native';
import axios from 'axios';

const Search = ({ navigation }) => {
    
  const [cafename, setCafename] = useState('');
  const [cafeList, setCafeList] = useState([]);

  const searchCafe = async() => {
    console.log('카페검색');
    try {
      const response = await axios.get(
        `http://3.38.99.110:8080/api/customer/shop/search/?q=${cafename}`
      );
      console.log(response.data);
      setCafeList(response.data);
    }
    catch (e) {
      console.log('카페리스트 검색 실패!');
      console.log(e);
    }
  }

  const goCafeDetail = (point) => {
    console.log('카페상세로 이동하기');
    navigation.navigate('Cafe', point)
  }

  return (
    <View>
      <Text>Search Cafe</Text>
      <TextInput
        placeholder="cafename"
        value={cafename}
        onChangeText={setCafename}
      />
      <Button title="Search!!" onPress={() => searchCafe()} />

      {cafeList.map((cafe, index) => (
          <Pressable key={index} onPress={() => goCafeDetail({id: cafe.shopId})}>
            <Text>{ cafe.name }</Text>
          </Pressable> 
      ))}
    </View>
  );
}

export default Search;
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const Search = () => {
    
  const [cafename, setCafename] = useState('');
  const [cafeList, setCafeList] = useState([]);

  return (
    <View>
      <Text>Search Cafe</Text>
      <TextInput
        placeholder="cafename"
        value={cafename}
        onChangeText={setCafename}
      />
      <Button title="Sign UP" onPress={() => alert('카페찾기')} />

      {cafeList.map((cafe, index) => (
          <Pressable key={index}>
            <Text>{ cafe }</Text>
          </Pressable> 
      ))}
    </View>
  );
}

export default Search;
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';


const StyledCafeList = styled.View`
  padding: 5px;
  margin-bottom: 5px;
  border: 1px #dcdcdc;
  border-radius: 5px;
`
const Row = styled.View`
  flex-direction: row;
`
const Col1 = styled.View`
  flex-direction: column;
  width: 30%;
`
const Col2 = styled.View`
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 50%;
`
const Col3 = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: 20%;
`
const SearchedImage = styled.Image`
  align-items: center;
  margin: 5px;
  width: 80px;
  height: 60px;
  border-radius: 5px;
`
const StyledCafeItem = styled.Text`
  font-size: ${props => props.title ? "16px" : "13px"};
  font-weight : ${props => props.title ? "bold" : "normal"};
  color: ${props => props.distance ? "white" : "black"};
`;
const StyledDistance = styled.View`
  justify-content: center;
  align-items: center;
  background: #FF7F00;
  width: 60px;
  height: 20px;
  border-radius: 20px;
`;
const SearchBar = styled.View`
  flex-direction: row;
  margin: 10px;
`;
const SearchTextInput = styled.TextInput`
  font-family: 'InfinitySansR';
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 5px;
  border-width: 2px;
  border-color: #cacaca;
  flex-direction: column;
  width: 80%;
`;
const SearchButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  background: #FF7F00;
  height: 40px;
  border-radius: 5px;
  flex-direction: column;
  width: 20%;
`;
const SearchText = styled.Text`
  font-family: 'InfinitySansR';
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-top: 10px;
`;
const SearchButtonText = styled.Text`
  font-family: 'InfinitySansR';
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;


const Search = ({ navigation }) => {
    
  const [cafename, setCafename] = useState('');
  const [cafeList, setCafeList] = useState([]);

  const searchCafe = async() => {
    console.log('카페검색');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/customer/shop/search/?q=${cafename}`
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
    <ScrollView style={{backgroundColor:'#ffffff'}}>

      <SearchText>Search Cafe</SearchText>

      <SearchBar>
        <SearchTextInput
          placeholder="cafename"
          value={cafename}
          onChangeText={setCafename}
        />
        <SearchButton onPress={() => searchCafe()}>
          <SearchButtonText>카페 검색</SearchButtonText>
        </SearchButton>
      </SearchBar>

      {cafeList.map((cafe, index) => (
        <TouchableOpacity key={index} onPress={() => goCafeDetail({id: cafe.shopId})}>
          <StyledCafeList>
            <Row>
              <Col1>
                <SearchedImage source={{uri : cafe.imgUrl}}></SearchedImage>
              </Col1>
              <Col2>
                <StyledCafeItem title>
                  {cafe.name}
                </StyledCafeItem>
                <StyledCafeItem>
                  {cafe.open_at} ~ {cafe.close_at}
                </StyledCafeItem>
              </Col2>
              <Col3>
                <StyledDistance>
                  <StyledCafeItem distance>
                    {cafe.status}
                  </StyledCafeItem>
                </StyledDistance>
              </Col3>
            </Row>
          </StyledCafeList>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default Search;
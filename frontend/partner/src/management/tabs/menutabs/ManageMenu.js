import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
} from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';

const BASE_URL = 'http://3.38.99.110:8080/api/partner';

const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TopContainer = styled(Container)`
  flex: 0.2;
  align-items: flex-start;
`;
const ColumnContainer = styled(Container)`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

const ManageMenu = ({navigation}) => {
  const [menu, setMenu] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [extraList, setExtraList] = useState([]);

  const selecteMenu = item => {
    setSelectedId(item.id);
    setSelectedMenu(item);
    setSizeList(item.menuSizeList.menuSizeList);
    setExtraList(item.extraList.extraList);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => selecteMenu(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
  // 메뉴 받아오기
  const getMenu = async () => {
    try {
      const response = await axios.get(BASE_URL + '/menu');
      setMenu(response.data.menuList);
      // console.log(response.data.menuList[0]);
      // 만약 데이터 메뉴 리스트가 빈 배열이라면
      if (response.data.menuList.length !== 0) {
        selecteMenu(response.data.menuList[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //메뉴 삭제 요청
  const deleteMenu = async () => {
    try {
      const response = await axios.delete(
        BASE_URL + `/menu/${selectedMenu.id}`,
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  //메뉴 생성 요청
  const goCreateMenu = () => {
    navigation.navigate('CreateMenu');
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={menu}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
      <ColumnContainer>
        <TopContainer>
          <Text>메뉴정보</Text>
          <Button title="삭제" onPress={() => deleteMenu()} />
          <Button title="추가" onPress={() => goCreateMenu()} />
        </TopContainer>
        <Text>메뉴정보</Text>
        <Image
          style={{height: 200, width: 200}}
          source={{uri: selectedMenu.imgUrl}}
        />
        <Text>{selectedMenu.name}</Text>
        <Text>{selectedMenu.price}원</Text>
        {sizeList.length !== 0 ? (
          <>
            {sizeList.map((size, index) => (
              <View key={index}>
                <Text>사이즈정보</Text>
                <Text>{size.menuSizeName}</Text>
                <Text>{size.price}원</Text>
              </View>
            ))}
            {extraList.map((extra, index) => (
              <View key={index}>
                <Text>엑스트라 정보</Text>
                <Text>{extra.name}</Text>
                <Text>{extra.price}원</Text>
              </View>
            ))}
          </>
        ) : (
          <Text>메뉴 정보가 없습니다.</Text>
        )}
      </ColumnContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ManageMenu;

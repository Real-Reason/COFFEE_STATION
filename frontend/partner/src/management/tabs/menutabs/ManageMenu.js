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

const ManageMenu = () => {
  const [menu, setMenu] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState([]);

  const selecteMenu = item => {
    setSelectedId(item.menuId);
    setSelectedMenu(item);
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.menuId === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.menuId === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => selecteMenu(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };
  const getMenu = async () => {
    try {
      const response = await axios.get(BASE_URL + '/menu');
      console.log(response.data.menuList);
      setMenu(response.data.menuList);
    } catch (e) {
      console.log(e);
    }
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
          keyExtractor={item => item.menuId}
          extraData={selectedId}
        />
      </SafeAreaView>
      <ColumnContainer>
        <Container style={{flex: 0.3}}>
          <Text>메뉴정보</Text>
          <Button title="삭제" />
          <Button title="추가" />
        </Container>
        <Text>메뉴정보</Text>
        <Image
          style={{height: 200, width: 200}}
          source={{uri: selectedMenu.imgUrl}}
        />
        <Text>{selectedMenu.name}</Text>
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

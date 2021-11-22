import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {TabCompletedContext} from '../TabCompleted';
import styled from 'styled-components/native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const StTouchable = styled.TouchableOpacity`
  margin: 2px;
`;

const StText = styled.Text`
  padding: 10px;
  /* font-size: 10px; */
  font-family: 'InfinitySans-Bold';
`;

const Item = ({item, onPress, backgroundColor, textColor, borderColor}) => {
  return (
    <StTouchable
      onPress={onPress}
      style={[styles.item, backgroundColor, borderColor]}>
      <StText style={[styles.title, textColor]}>
        {item.menus[0].menuName} ({item.menus[0].quantity}){' '}
        {item.menus.length === 1 ? '' : '외 '}
        {item.menus.length === 1 ? 1 : item.menus.length - 1}건
      </StText>
    </StTouchable>
  );
};

const CompletedOrder = ({}) => {
  // const [selectedId, setSelectedId] = useState(null);
  const {
    selectedId,
    setSelectedId,
    setSelectedOrder,
    setSelectedOrderMenus,
    completedOrders,
  } = useContext(TabCompletedContext);

  const setCompleted = item => {
    setSelectedId(item.orderId);
    setSelectedOrder(item);
    setSelectedOrderMenus(item.menus);
  };
  const renderItem = ({item}) => {
    const backgroundColor = item.orderId === selectedId ? '#ff7f00' : 'white';
    const color = item.orderId === selectedId ? 'white' : 'black';
    const borderColor = item.id === selectedId ? 'white' : '#ff7f00';

    return (
      <Item
        item={item}
        onPress={() => setCompleted(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderColor={{borderColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={completedOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 0.5,
  },
  title: {
    fontSize: 25,
  },
});

export default CompletedOrder;

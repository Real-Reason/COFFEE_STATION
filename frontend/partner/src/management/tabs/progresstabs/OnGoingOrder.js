import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {TabProgressContext} from '../TabProgress';
import styled from 'styled-components/native';

const StTouchable = styled.TouchableOpacity`
  margin: 2px;
`

const StText = styled.Text`
  padding: 10px;
  /* font-size: 10px; */
  font-family: "InfinitySans-Bold";
`

const Item = ({item, onPress, backgroundColor, textColor, borderColor}) => {
  return (
    <StTouchable onPress={onPress} style={[styles.item, backgroundColor, borderColor]}>
      <StText style={[styles.title, textColor]}>{item.orderId}</StText>
    </StTouchable>
  );
};

const OnGoingOrder = ({}) => {
  const {
    selectedPreparingId,
    setSelectedPreparingId,
    setSelectedOrder,
    preparingOrders,
  } = useContext(TabProgressContext);

  const setPreparingOrder = item => {
    setSelectedPreparingId(item.orderId);
    setSelectedOrder(item);
  };

  const renderItem = ({item}) => {
    const backgroundColor =
      item.orderId === selectedPreparingId ? '#ff7f00' : 'white';
    const color = item.orderId === selectedPreparingId ? 'white' : 'black';
    const borderColor = item.orderId === selectedPreparingId ? 'white' : '#ff7f00';

    return (
      <Item
        item={item}
        onPress={() => setPreparingOrder(item)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        borderColor={{borderColor}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={preparingOrders}
        renderItem={renderItem}
        keyExtractor={item => item.orderId}
        extraData={selectedPreparingId}
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
    fontSize: 32,
  },
});

export default OnGoingOrder;

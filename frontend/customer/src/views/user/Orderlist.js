import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const Orderlist = () => {
  return (
      <Container>
        <Text>Orderlist</Text>
      </Container>
  );
}



export default Orderlist;
import React, {useState} from 'react';
import {Button, Modal, Pressable} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
`;

const Test = () => {
  const [isModal, setModal] = useState(false);
  return (
    <Container>
      <Modal visible={isModal}>
        <Postcode
          style={{width: 320, height: 320}}
          jsOptions={{animation: true, hideMapBtn: true}}
          onSelected={data => {
            alert(JSON.stringify(data));
            setModal(false);
          }}
        />
      </Modal>
      <Button title="주소입력" onPress={() => setModal(true)}></Button>
    </Container>
  );
};

export default Test;

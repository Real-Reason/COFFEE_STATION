import React, {useState} from 'react';
import {Modal, Button} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';

const Test = () => {
  const [isModal, setModal] = useState(false);
  return (
    <>
      <Modal isVisible={isModal}>
        <Postcode
          style={{width: 320, height: 320}}
          jsOptions={{animation: true, hideMapBtn: true}}
          onSelected={data => {
            alert(JSON.stringify(data));
            setModal(false);
          }}
        />
      </Modal>
      <Button title="" onClick={() => setModal(true)}>
        주소찾기
      </Button>
    </>
  );
};

export default Test;

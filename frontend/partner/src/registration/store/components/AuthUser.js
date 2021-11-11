import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useRef} from 'react';
import {Modal, Button} from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import styled from 'styled-components/native';
import axios from 'axios';

const Container = styled.View`
  justify-content: center;
  /* align-items: center; */
`;
const StyledInput = styled.TextInput`
  border: 1px solid #111111;
  padding: 10px;
  margin: 10px 10px;
  width: 200px;
  font-size: 24px;
`;
const StyledText = styled.Text`
  font-size: 24px;
  padding: 10px;
  margin: 10px 0;
`;
const StyledBtn = styled.Button`
  font-size: 18px;
  margin: 10px 0;
`;
// custom
const RegisterBtn = styled(StyledBtn)`
  border-width: 0;
  color: #ffffff;
`;
const AddressInput = styled(StyledInput)`
  width: 500px;
`;

const validateBuis = async data => {
  console.log('validation progressing...');
  console.log(data);
  try {
    const response = await axios.post(
      'http:10.0.2.2:8080/api/partner/validation',
      data,
    );
    console.log(response.data);
  } catch (error) {
    alert('사업자 인증에 실패하셨습니다!');
  }
};

const AuthUser = ({navigation}) => {
  // Store state
  const [b_no, setb_no] = useState('');
  const [shopName, setShopName] = useState('');

  // Address state
  const [zoncode, setZoncode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  // Store useRef
  const refb_no = useRef(null);
  const refShopName = useRef(null);

  // KAKAO POSTCODE
  const [isModal, setModal] = useState(false);

  return (
    <Container>
      <StyledText>사업자 등록번호</StyledText>
      <StyledInput
        value={b_no}
        onChangeText={setb_no}
        ref={refb_no}
        returnKeyType="next"
        onSubmitEditing={() => refShopName.current.focus()}
      />
      <StyledBtn title="사업자 확인" onPress={() => validateBuis({b_no})} />
      <StyledText>상호</StyledText>
      <StyledInput
        value={shopName}
        onChangeText={setShopName}
        ref={refShopName}
        returnKeyType="done"
      />
      <StyledText>사업장 소재지</StyledText>
      <StyledInput
        placeholder="우편번호"
        value={zoncode}
        onPressIn={() => setModal(true)}
      />
      <Modal visible={isModal}>
        <Postcode
          style={{flex: 1}}
          jsOptions={{
            animation: true,
            animationType: 'slide',
            hideMapBtn: true,
          }}
          onSelected={data => {
            // 여기서 setData로 넘겨줘야 할 듯
            setZoncode(data.zonecode);
            setAddress(data.address);
            alert(JSON.stringify(data));
            setModal(false);
          }}
        />
      </Modal>
      <AddressInput placeholder="주소" value={address} editable={false} />
      <AddressInput
        placeholder="상세주소"
        value={detailAddress}
        onChangeText={setDetailAddress}
      />
      <RegisterBtn
        title="다음"
        onPress={() => navigation.navigate('AuthUser')}></RegisterBtn>
    </Container>
  );
};

export default AuthUser;

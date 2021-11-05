import React, {useRef} from 'react';
import styled from 'styled-components/native';

const StyledInput = styled.TextInput`
  border: 1px solids #111111;
  padding: 10px;
  margin: 10px 0;
  width: 200px;
  font-size: 24px;
`;

const StyledButton = styled.Button`
  font-size: 20px;
  padding: 10px;
  margin: 10px 0;
`;


const Login = () => {
  const refEmail = useRef(null);
  const refPassword = useRef(null);

  const onSubmit = () => console.log('axios 요청 날려야 함')
  return (
      <>
        <StyledInput
          placeholder="email"
          ref={refEmail}
          returnKeyType="next"
          onSubmitEditing={() => refPassword.current.focus()}
        >  
        </StyledInput>
        <StyledInput
          placeholder="password"
          ref={refPassword}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        >  
        </StyledInput>
      </>
  );
}

export default Login;
import React from 'react';
import styled from 'styled-components';

import RegisterForm from './registerPage/RegisterForm';
import Header from './landingPage/Header';

const Page = styled.div`
  height: 100%;
`;

const FormContainer = styled.div`
  margin-top: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-position: row;
  justify-content: space-evenly;
`;

const Register = () => (
  <Page>
    <Header/>
    <FormContainer>
      <RegisterForm/>
    </FormContainer>
  </Page>
);

Register.defaultProps = {};

Register.propTypes = {};

export default Register;

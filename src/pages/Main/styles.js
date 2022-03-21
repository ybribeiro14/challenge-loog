import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const Container = styled.div`
  padding: 50px;
`;

export const CustomForm = styled(Form)`
  display: flex;
  width: 100%;

  button {
    margin-left: 15px;
  }

  @media (max-width: 576px) {
    flex-direction: column;

    button {
      margin-left: 0;
      margin-top: 10px;
      width: 100%;
      margin: 10px;
    }
  }
`;

export const WrapperLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0px;
`;

export const AlertEmptyData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 50px;

  font-size: 20px;
`;

export const WhapperButtons = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 576px) {
    justify-content: space-between;
    width: 100%;
  }
`;

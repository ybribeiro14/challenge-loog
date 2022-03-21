import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;

  img {
    width: 300px;
    height: 300px;

    border-radius: 100%;

    margin-bottom: 15px;
  }

  p {
    font-weight: 600;
    font-size: 22px;
  }
`;

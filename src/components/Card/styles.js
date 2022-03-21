import styled from 'styled-components';

import Image from 'react-bootstrap/Image';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  flex-direction: column;

  padding: 10px;

  p {
    font-weight: 600;
    font-size: 20px;

    margin-top: 10px;
  }
`;

export const ImageCustom = styled(Image)`
  border-radius: 10px;
`;

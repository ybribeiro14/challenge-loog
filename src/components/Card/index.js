import React from 'react';

import { Container, ImageCustom } from './styles';

function Card({ member, openModal }) {
  return (
    <Container onClick={() => openModal(member.login)}>
      <ImageCustom src={member.avatar_url} width="100%" height="100%" />
      <p>{member.login}</p>
    </Container>
  );
}

export default Card;

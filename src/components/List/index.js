import React from 'react';

import Card from '../Card';

import { Container } from './styles';

function List({ dataList, openModal }) {
  return (
    <Container>
      {dataList.length
        ? dataList.map(member => (
            <Card key={member.id} member={member} openModal={openModal} />
          ))
        : ''}
    </Container>
  );
}

export default List;

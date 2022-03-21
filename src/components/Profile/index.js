import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import { Container } from './styles';

function Profile({ login }) {
  const [user, setUser] = useState();

  useEffect(async () => {
    const response = await api.get(`/users/${login}`);
    if (response.status === 200) {
      setUser(response.data);
    }
  }, []);
  return (
    <Container>
      {user ? (
        <>
          <Image src={user.avatar_url} />

          <p>{user.name}</p>
          <p>{user.public_repos} Repositórios Públicos</p>
          <p>{user.followers} Seguidores</p>
          <p>
            Criado em: {format(parseISO(user.created_at), 'dd/MM/yyyy HH:mm')}
          </p>
        </>
      ) : (
        ''
      )}
    </Container>
  );
}

export default Profile;

import React, { useState, useEffect, useCallback } from 'react';
import { Button, Row, Form, Col, Spinner, Modal } from 'react-bootstrap';
import api from '../../services/api';

import List from '../../components/List';

import {
  Container,
  CustomForm,
  WrapperLoading,
  AlertEmptyData,
  WhapperButtons,
} from './styles';
import Profile from '../../components/Profile';

function Main() {
  const [listMembers, setListMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endList, setEndList] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [textFilter, setTextFilter] = useState('');
  const [profileClicked, setProfileClicked] = useState('');

  const handleFilterMembers = useCallback(() => {
    setLoading(true);
    setListMembers([]);
    setEndList(false);
    setCurrentPage(1);
  }, [setListMembers, setCurrentPage]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  const handleOpenModal = useCallback(
    login => {
      setProfileClicked(login);
      setOpenModal(true);
    },
    [setOpenModal, setProfileClicked],
  );

  const handleClearFilter = useCallback(() => {
    setTextFilter('');
    setListMembers([]);
    setCurrentPage(1);
  }, [setTextFilter, setListMembers, setCurrentPage]);

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orgs/facebook/public_members`, {
        params: {
          per_page: 20,
          page: currentPage,
          order: 'DESC',
        },
      });

      if (response.status !== 200) {
        return;
      }

      if (!response.data.length) {
        setEndList(true);
      }

      let listFiltered = response.data;
      if (textFilter !== '') {
        listFiltered = response.data.filter(member => {
          return member.login.toLowerCase().includes(textFilter.toLowerCase());
        });
      }

      setListMembers(prevMembers => [...prevMembers, ...listFiltered]);
      const totalMembers = listMembers.length + listFiltered.length;
      if (totalMembers < 20 && textFilter !== '') {
        setCurrentPage(currentPageInsideState => currentPageInsideState + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [
    setListMembers,
    currentPage,
    textFilter,
    handleFilterMembers,
    listMembers,
    setCurrentPage,
  ]);

  useEffect(() => {
    if (currentPage > 0 && !endList) {
      const loadData = async () => {
        await loadMembers();
      };

      loadData();
    }
  }, [currentPage]);

  useEffect(() => {
    setTextFilter('');
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setCurrentPage(currentPageInsideState => currentPageInsideState + 1);
      }
    });

    observer.observe(document.querySelector('#finalList'));

    return () => IntersectionObserver.disconnect();
  }, []);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xl={5} lg={5} sm={12} md={12}>
          <CustomForm>
            <Form.Group className="w-100" controlId="formInputSearch">
              <Form.Control
                type="loginSearch"
                placeholder="Buscar pelo login"
                value={textFilter}
                onChange={e => {
                  setTextFilter(e.target.value);
                }}
              />
            </Form.Group>
            <WhapperButtons>
              <Button variant="primary" onClick={() => handleFilterMembers()}>
                Buscar
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleClearFilter()}
              >
                Limpar
              </Button>
            </WhapperButtons>
          </CustomForm>
        </Col>
      </Row>

      <Row>
        {listMembers.length === 0 && !loading && endList ? (
          <AlertEmptyData>
            <p>
              Não foi encontrado nenhum membro com esse login! Tente novamente.
            </p>
          </AlertEmptyData>
        ) : (
          <List dataList={listMembers} openModal={handleOpenModal} />
        )}

        <div id="finalList" style={{ height: 20 }} />
        {loading && (
          <WrapperLoading>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </WrapperLoading>
        )}
      </Row>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Body>
          <Profile login={profileClicked} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Main;

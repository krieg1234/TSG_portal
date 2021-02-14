import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

import { selectPage } from './appSlice';

import { NavbarComponent } from './features/navbar/NavbarComponent';
import { MainPage } from './features/mainPage/MainPage';
import { NewsPage } from './features/newsPage/NewsPage';
import { ContactsPage } from './features/contactsPage/ContactsPage';
import { SalesPage } from './features/salesPage/SalesPage';

function App() {
  const currentPage = useSelector(selectPage);

  const pages = {
    MainPage: <MainPage />,
    NewsPage: <NewsPage />,
    SalesPage: <SalesPage />,
    ContactsPage: <ContactsPage />,
  };

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col md={2}>
            <NavbarComponent />
          </Col>
          <Col>{pages[currentPage]}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

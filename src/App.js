import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

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
        <NavbarComponent />
      </Container>

      <Container>{pages[currentPage]}</Container>
    </div>
  );
}

export default App;

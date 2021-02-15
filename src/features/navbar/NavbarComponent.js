import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { switchPage } from '../../appSlice';
//панель навигации
export function NavbarComponent() {
  const dispatch = useDispatch();

  return (
    <Navbar
      bg="light"
      expand="md"
      className="sidebar"
     
    >
      <Navbar.Brand>ТСЖ "Новый бульвар 2"</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav  className="mr-auto">
          <Nav.Link onClick={() => dispatch(switchPage('MainPage'))}>
            Главная
          </Nav.Link>

          <Nav.Link onClick={() => dispatch(switchPage('NewsPage'))}>
            Новости
          </Nav.Link>

          <Nav.Link onClick={() => dispatch(switchPage('SalesPage'))}>
            Объявления
          </Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

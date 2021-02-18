import React from 'react';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap';

export function MainPage() {
  return (
    <Container>
    <div className="mainPage">
      <h1 className="page-header">Главная</h1>
      <p className="page-discripion">
        Добро пожаловать на портал товарищества собстевенников жилья по адресу
        г. Долгопрудный, ул. Новый бульвар, д.2.
      </p>
      <hr />
      <Row>
        <Col xl={6}>
        <div className="map">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aed6ebfebb2a8bc7d405c66ce5062950f3205fcb70bc058199addb9277424bff0&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
      </div>
        </Col>
        <Col xl={6}>
        <div className="contacts">
        <h2>Наши контакты</h2>
        <div className="contacts-block">
          <h4>Председатель товарищества</h4>
          <p>Кряжев Юрий Юрьевич</p>
          <p className="phone">+7(909)666-95-30</p>
        </div>
        <div className="contacts-block">
          <h4>Казначей товарищества</h4>
          <p>Коваленко Людмила Михайловна</p>
          <p className="phone">+7(909)666-95-30</p>
        </div>
        <div className="contacts-block">
          <h4>Юрист товарищества</h4>
          <p>Милкова Ирина Геннадьевна</p>
          <p className="phone">+7(909)666-95-30</p>
          <a className="email">olegkrieg@gmail.com</a>
        </div>
      </div>
        </Col>
      </Row>
      
     
      
      <hr />
      <div className="contacts">
        <h2>Полезные ссылки</h2>
        <div className="contacts-block">
          <h4>УК "Стрйожилинвест</h4>
          <a href="http://xn--b1agbiadqrdtkkcl.xn--p1ai/">
            Сайт управляющей компании
          </a>
        </div>
        <div className="contacts-block">
          <h4>ООО "ТВ-Маркет"</h4>
          <a href="https://tvmapket.ru/">Сайт интернет-провайдера</a>
        </div>
        <div className="contacts-block">
          <h4>ЖКХ Онлайн</h4>
          <a href="https://newlk.erconline.ru/home/?action=login">
            Сайт управления ЖКХ услугами
          </a>
        </div>
        <div className="contacts-block">
          <h4>МосЭнергоСбыт</h4>
          <a href="https://my.mosenergosbyt.ru/auth">
            Сайт поставщика электроэнергии
          </a>
        </div>
      </div>
    </div>
    </Container>
    
  );
}

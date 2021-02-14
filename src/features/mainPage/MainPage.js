import React from 'react';

export function MainPage() {
  return (
    <div className="mainPage">
      <h1 className="page-header">Главная</h1>
      <p className="page-discripion">
        Добро пожаловать на портал товарищества собстевенников жилья по адресу
        г. Долгопрудный, ул. Новый бульвар, д.2.
      </p>
      <div className="map">
        <a
          href="https://yandex.ru/maps/?um=constructor%3Aed6ebfebb2a8bc7d405c66ce5062950f3205fcb70bc058199addb9277424bff0&amp;source=constructorStatic"
          target="_blank"
        >
          <img
            src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3Aed6ebfebb2a8bc7d405c66ce5062950f3205fcb70bc058199addb9277424bff0&amp;width=500&amp;height=400&amp;lang=ru_RU"
            alt=""
          />
        </a>
      </div>
      <hr />
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
  );
}

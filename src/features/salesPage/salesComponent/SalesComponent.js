import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

export function ListSalesComponent(props) {
  const { header, content, price, author, phone, email } = props.salesItem;
  const { category } = props;
  return (
    <div>
      <h3>{header}</h3>
      <p>Категория: {category}</p>
      <br />
      <p>{content}</p>
      <p>Цена: {price} руб.</p>
      <br />
      <p>Автор: {author} </p>
      <p>
        Контакты:{phone} {email}
      </p>
    </div>
  );
}

export function CardSalesComponent(props) {
  const { id, header, content, price, author, phone, email } = props.salesItem;
  const { category, setCurrentSale, currentSale } = props;
  const isExpanded = currentSale === id;
  return (
    <Card
      style={{ width: '18rem',  }}
      onClick={() => setCurrentSale(isExpanded ? null : id)}
    >
      <Card.Body>
        <Card.Title>{header}</Card.Title>
        <Card.Title className={isExpanded ? '' : 'collapse'}>
          {category}
        </Card.Title>
        <br />
        <Card.Text className={isExpanded ? '' : 'collapse'}>
          {content}
        </Card.Text>
        <Card.Title>{price} руб.</Card.Title>
        <br />
        <Card.Text className={isExpanded ? '' : 'collapse'}>
          Автор: {author}
        </Card.Text>
        <Card.Text className={isExpanded ? '' : 'collapse'}>
          Контакты: {phone} {email}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

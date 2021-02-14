import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectSales, addSale } from '../salesSlice';
import { Sale } from '../Sale';

export function SalesAddModal(props) {
  console.log('Render SalesModal');
  const { allCategoryes, categoryesById } = useSelector(selectSales);
  const dispath = useDispatch();
  const [saleData, setSaleData] = useState(
    Sale.allFields.reduce((acc, f) => {
      if (f === Sale.categoryIdField) return { ...acc, [f]: 0 };
      return { ...acc, [f]: '' };
    }, {})
  );

  const createInput = (field, type, placeholder, as = 'input') => {
    return (
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={saleData[field]}
        as={as}
        rows={as ? 3 : 1}
        onChange={(e) =>
          setSaleData({
            ...saleData,
            [field]: e.target.value,
          })
        }
      />
    );
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новое объявление
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="saleModal.headerInput">
            <Form.Label>Название объявления</Form.Label>

            {createInput(
              Sale.headerField,
              'saleName',
              'Например, "Листы гипсокартона"'
            )}
          </Form.Group>
          <Form.Group controlId="saleModal.contanctsInput">
            <Form.Label>Ваши контакты</Form.Label>

            {createInput(Sale.authorField, 'name', 'Ваше имя')}
            {createInput(Sale.emailField, 'email', 'Ваша электронная почта')}
            {createInput(Sale.phoneField, 'phone', 'Ваш номер телефона')}
          </Form.Group>
          <Form.Group controlId="saleModal.contentInput">
            <Form.Label>Описание</Form.Label>
            {createInput(Sale.contentField, 'content', '', 'textarea')}
          </Form.Group>
          <Form.Group>
            <Form.Label>Цена (руб.)</Form.Label>
            {createInput(Sale.priceField, 'price', '')}
          </Form.Group>
          <Form.Group controlId="saleModal.categoryInput">
            <Form.Label>Категория</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) =>
                setSaleData({
                  ...saleData,
                  [Sale.categoryIdField]:
                    e.target.children[e.target.options.selectedIndex].attributes
                      .categoryid.value,
                })
              }
            >
              {allCategoryes.map((c) => (
                <option key={c} categoryid={c}>
                  {categoryesById[c].name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            dispath(addSale(saleData));
            props.onHide();
          }}
        >
          Добавить
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

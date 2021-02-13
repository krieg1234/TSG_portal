import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addNews } from '../newsSlice';

export function NewsAddModal(props) {
  const [header, headerInputHandler] = useState('');
  const [content, contentInputHandler] = useState('');
  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Новая новость
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewsHeader">
            <Form.Label>Заголовок новости</Form.Label>
            <Form.Control
              type="newsHeader"
              value={header}
              onChange={(e) => headerInputHandler(e.target.value)}
              placeholder="Введите заголовок"
            />
          </Form.Group>

          <Form.Group controlId="formNewsContent">
            <Form.Label>Содержание новости</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              type="newsContent"
              value={content}
              onChange={(e) => contentInputHandler(e.target.value)}
              placeholder="Введите содержание Вашей новости"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={() => {
              dispatch(addNews({ header, content }));
              headerInputHandler('');
              contentInputHandler('');
              props.onHide();
            }}
          >
            Добавить
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

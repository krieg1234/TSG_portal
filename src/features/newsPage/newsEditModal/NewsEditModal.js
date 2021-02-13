import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editNews } from '../newsSlice';

export function NewsEditModal(props) {
  const dispatch = useDispatch();
  const { data, setNewsEditModalData, onHide } = props;
  const { header, content } = data;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Редактирование новости
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewsHeader">
            <Form.Label>Заголовок новости</Form.Label>
            <Form.Control
              type="newsHeader"
              value={header}
              onChange={(e) => {
                setNewsEditModalData({
                  ...data,
                  header: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setNewsEditModalData({
                  ...data,
                  content: e.target.value,
                });
              }}
              placeholder="Введите содержание Вашей новости"
            />
          </Form.Group>

          <Button
            variant="primary"
            onClick={() => {
              dispatch(editNews(data));
              setNewsEditModalData({ id: '', header: '', content: '' });
              onHide();
            }}
          >
            Сохранить изменения
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

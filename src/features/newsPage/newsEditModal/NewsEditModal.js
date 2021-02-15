import { Button, Form, Modal } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import { editNews } from '../newsSlice';
//модальное окно редактирования новости
export function NewsEditModal(props) {
  const dispatch = useDispatch();
  const { data, setNewsEditModalData, onHide } = props;
  const { title, body } = data;
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
              value={title}
              onChange={(e) => {
                setNewsEditModalData({
                  ...data,
                  title: e.target.value,
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
              value={body}
              onChange={(e) => {
                setNewsEditModalData({
                  ...data,
                  body: e.target.value,
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

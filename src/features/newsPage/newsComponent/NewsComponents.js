import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteNews } from '../newsSlice';
export function NewsComponents(props) {
  const dispatch = useDispatch();
  const {
    setNewsEditModalShow,
    setNewsEditModalData,
    id,
    header,
    content,
  } = props;
  return (
    <div className="">
      <h3>{header}</h3>
      <p>{content}</p>
      <Button
        size="sm"
        variant="warning"
        onClick={() => {
          setNewsEditModalData();
          setNewsEditModalShow(true);
        }}
      >
        Редактировать
      </Button>
      <Button
        size="sm"
        variant="danger"
        onClick={() => dispatch(deleteNews({ id }))}
      >
        Удалить
      </Button>
    </div>
  );
}

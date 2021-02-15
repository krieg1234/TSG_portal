import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
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
    <div className="newsComponent" style={{margin:'1rem',padding:'1rem',border:'2px solid green', borderRadius:'25px'}}>
      <Row>
       <Col md={9}>
       <h3>{header}</h3>
      <p>{content}</p></Col>
       <Col md={3}>
       <Button
        size="md"
        variant="warning"
        style={{width:'10rem', margin:'1rem'}}
        onClick={() => {
          setNewsEditModalData();
          setNewsEditModalShow(true);
        }}
      >
        Редактировать
      </Button>
      <Button
        size="md"
        variant="danger"
        style={{width:'10rem', margin:'1rem'}}
        onClick={() => dispatch(deleteNews({ id }))}
      >
        Удалить
      </Button></Col>
      </Row>
      
      
    </div>
  );
}

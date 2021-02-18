import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNews, fetchNews } from './newsSlice';

import { NewsComponents } from './newsComponent/NewsComponents';
import { Button, Container } from 'react-bootstrap';
import { NewsAddModal } from './newsAddModal/NewsAddModal';
import { NewsEditModal } from './newsEditModal/NewsEditModal';

export function NewsPage() {
  const dispatch=useDispatch()
  //селектор для всех новостей из стора
  const { allNews, newsById } = useSelector(selectNews);

  //хуки для управления модальными окнами
  const [newsAddModalShow, setNewsAddModalShow] = useState(false);
  const [newsEditModalShow, setNewsEditModalShow] = useState(false);
  //хук для данных в полях ввода в модальных окнах
  const [newsEditModalData, setNewsEditModalData] = useState({
    id: '',
    title: '',
    body: '',
  });
//селекторы для асинхронного запроса
  const newStatus=useSelector(state=>state.news.status);
  const error=useSelector(state=>state.news.error);
  //блок новостей, в зависимости от статуса запроса
  const contentByStatus={
    'loading':(<div>Загрузка...</div>),
    'failed':(<div>Что-то пошло не так...{error}</div>),
    'success':(allNews.map((n) => {
      if(!newsById[n]) return null;
      const { id, title, body } = newsById[n];
      return (
        <NewsComponents
          key={id}
          id={id}
          header={title}
          content={body}
          setNewsEditModalShow={setNewsEditModalShow}
          setNewsEditModalData={() =>
            setNewsEditModalData({ id, title, body })
          }
        />
      );
    }))
  }
  //выполняем запрос на сервер только при первой загрузке
  useEffect(()=>{
    if (newStatus==='idle'){
      dispatch(fetchNews())
    }
  },[newStatus,dispatch])

  return (
    <Container>
<div className="newsPage">
      <h1 className="page-header">Новости</h1>
      <p className="page-discripion">
        В это разделе Вы можете ознакомиться с важными новостями нашего дома.
      </p>
      <Button variant="primary" onClick={() => setNewsAddModalShow(true)}>
        Добавить новость
      </Button>
      <hr />
      {contentByStatus[newStatus]}
      
      <NewsAddModal
        show={newsAddModalShow}
        onHide={() => setNewsAddModalShow(false)}
      />
      <NewsEditModal
        show={newsEditModalShow}
        data={newsEditModalData} //данные для заполнения данных в полях ввода
        setNewsEditModalData={setNewsEditModalData} //хук для изменения данных в модальном окне
        onHide={() => setNewsEditModalShow(false)}
      />
    </div>

    </Container>
    
  );
}

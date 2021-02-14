import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNews, fetchNews } from './newsSlice';

import { NewsComponents } from './newsComponent/NewsComponents';
import { Button } from 'react-bootstrap';
import { NewsAddModal } from './newsAddModal/NewsAddModal';
import { NewsEditModal } from './newsEditModal/NewsEditModal';

export function NewsPage() {
  const dispatch=useDispatch()
  const { allNews, newsById } = useSelector(selectNews);
  const [newsAddModalShow, setNewsAddModalShow] = useState(false);
  const [newsEditModalShow, setNewsEditModalShow] = useState(false);
  const [newsEditModalData, setNewsEditModalData] = useState({
    id: '',
    title: '',
    body: '',
  });

  const newStatus=useSelector(state=>state.news.status);
  const error=useSelector(state=>state.news.error);
  const contentByStatus={
    'loading':(<div>Загрузка...</div>),
    'failed':(<div>Что-то пошло не так...{error}</div>),
    'success':(allNews.map((n) => {
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
  useEffect(()=>{
    if (newStatus==='idle'){
      dispatch(fetchNews())
    }
  },[newStatus,dispatch])

  return (
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
        data={newsEditModalData}
        setNewsEditModalData={setNewsEditModalData}
        onHide={() => setNewsEditModalShow(false)}
      />
    </div>
  );
}

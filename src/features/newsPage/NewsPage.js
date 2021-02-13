import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNews } from './newsSlice';

import { NewsComponents } from './newsComponent/NewsComponents';
import { Button } from 'react-bootstrap';
import { NewsAddModal } from './newsAddModal/NewsAddModal';
import { NewsEditModal } from './newsEditModal/NewsEditModal';
export function NewsPage() {
  const { allNews, newsById } = useSelector(selectNews);
  const [newsAddModalShow, setNewsAddModalShow] = useState(false);
  const [newsEditModalShow, setNewsEditModalShow] = useState(false);
  const [newsEditModalData, setNewsEditModalData] = useState({
    id: '',
    header: '',
    content: '',
  });
  return (
    <div className="newsPage">
      <h1>Новости</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
        iure, nulla saepe dolore minima placeat. Velit incidunt mollitia quos
        est.
      </p>
      <Button variant="primary" onClick={() => setNewsAddModalShow(true)}>
        Добавить новость
      </Button>
      <hr />
      {allNews.map((n) => {
        const { id, header, content } = newsById[n];
        return (
          <NewsComponents
            key={id}
            id={id}
            header={header}
            content={content}
            setNewsEditModalShow={setNewsEditModalShow}
            setNewsEditModalData={() =>
              setNewsEditModalData({ id, header, content })
            }
          />
        );
      })}
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

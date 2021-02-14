import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { selectSales, fetchSales} from './salesSlice';

import { Accordion, Button, Pagination } from 'react-bootstrap';

import { salesFilter } from './functions/salesFilter';

import { FilterBar, getDefaultOptions } from './filterBar/FilterBar';
import { SalesAddModal } from './salesAddModal/SalesAddModal';
import {PaginationComponent} from './paginationComponent/PaginationComponent'

export function  SalesPage() { 
  
  console.log('Render SalesPage');
  const dispatch=useDispatch();
  const { allSales, salesById, allCategoryes, categoryesById } = useSelector(
    selectSales
  );
 
  const {
    defaultDisplayMode,
    defaultSortMode,
    defaultPriceRange,
  } = getDefaultOptions();
  const [displayMode, setDisplayMode] = useState(defaultDisplayMode);
  const [sortMode, setSortMode] = useState(defaultSortMode);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [textFilter, setTextFilter] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  

  const filters = { currentCategory, priceRange, textFilter, sortMode };
  const filtredSales=allSales.filter((s) => salesFilter(salesById[s], filters));

  const [currentPage, setCurrentPage]=useState(1);
  const pageCount=filtredSales.length/20;
 


  const salesStatus=useSelector(state=>state.sales.status);
  const error=useSelector(state=>state.sales.error);
  
  const contentByStatus={
    'loading':(<div>Загрузка...</div>),
    'failed':(<div>Что-то пошло не так...{error}</div>),
    'success': (filtredSales
      .filter((s,index)=>{
        const isInRange=(index>=currentPage*20-20) && (index<currentPage*20)
        return (isInRange)})
      .map((s) => {
       const  category = categoryesById[salesById[s].categoryId].name;
       return displayMode.salesComponent({
          key: salesById[s].id,
          salesItem: salesById[s],
          category: category,
          setCurrentSale: setCurrentSale,
          currentSale: currentSale,
        });
      })),
  };

  

  useEffect(()=>{
    if (salesStatus==='idle'){
      dispatch(fetchSales())
    }
  },[salesStatus,dispatch]);
   
  return (
    <div className="salesPage">
      <h1 className="page-header">Доска объявлений</h1>
      <p className="page-discription">
        В этом разделе Вы можете просмотреть и разместить Ваши объявления об
        аренде, оказании услуг и продаже товаров.
      </p>
      <Button onClick={() => setModalShow(true)}>Добавить объявление</Button>

      <Accordion>
        <Accordion.Toggle as={Button} variant="link" eventKey="0">
          Показать фильры
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <FilterBar
            allCategoryes={allCategoryes}
            categoryesById={categoryesById}
            currentCategory={currentCategory}
            sortMode={sortMode}
            displayMode={displayMode}
            hooks={{
              setDisplayMode,
              setSortMode,
              setCurrentCategory,
              setPriceRange,
              setTextFilter,
            }}
          />
        </Accordion.Collapse>
      </Accordion>

      <hr />
      
      <div id="saleComponents" style={displayMode.containerStyle}>
        {contentByStatus[salesStatus]}
      </div>

<PaginationComponent pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {modalShow ? (
        <SalesAddModal show={modalShow} onHide={() => setModalShow(false)} />
      ) : null}
    </div>
  );
}

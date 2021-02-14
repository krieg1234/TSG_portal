import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSales } from './salesSlice';

import { Accordion, Button } from 'react-bootstrap';

import { salesFilter } from './functions/salesFilter';

import { FilterBar, getDefaultOptions } from './filterBar/FilterBar';
import { SalesAddModal } from './salesAddModal/SalesAddModal';

export function SalesPage() {
  console.log('Render SalesPage');
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
      {console.log(displayMode.containerStyle)}
      <div className="saleComponents" style={displayMode.containerStyle}>
        {allSales
          .filter((s) => salesFilter(salesById[s], filters))
          .map((s) => {
            const category = categoryesById[salesById[s].categoryId].name;

            return displayMode.salesComponent({
              key: salesById[s].id,
              salesItem: salesById[s],
              category: category,
              setCurrentSale: setCurrentSale,
              currentSale: currentSale,
            });
          })}
      </div>

      {modalShow ? (
        <SalesAddModal show={modalShow} onHide={() => setModalShow(false)} />
      ) : null}
    </div>
  );
}

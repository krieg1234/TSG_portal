import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSales } from './salesSlice';

import { Button } from 'react-bootstrap';

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
  const [currentCategory, setCurrentCategory] = useState(undefined);
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const [textFilter, setTextFilter] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);
  const filters = { currentCategory, priceRange, textFilter, sortMode };

  return (
    <div className="salesPage">
      <h1>Доска объявлений</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
        iure, nulla saepe dolore minima placeat. Velit incidunt mollitia quos
        est.
      </p>
      <Button onClick={() => setModalShow(true)}>Добавить объявление</Button>
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
      <hr />
      {allSales
        .filter((s) => salesFilter(salesById[s], filters))
        .map((s) => {
          const category = categoryesById[salesById[s].categoryId].name;

          return (
            <div className="salesComponent" key={salesById[s].id}>
              {displayMode.salesComponent({
                key: salesById[s].id,
                salesItem: salesById[s],
                category: category,
                setCurrentSale: setCurrentSale,
                currentSale: currentSale,
              })}
            </div>
          );
        })}
      {modalShow ? (
        <SalesAddModal show={modalShow} onHide={() => setModalShow(false)} />
      ) : null}
    </div>
  );
}

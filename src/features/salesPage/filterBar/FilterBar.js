import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortSales } from '../salesSlice';

import {
  ListSalesComponent,
  CardSalesComponent,
} from '../salesComponent/SalesComponent';

import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  Dropdown,
} from 'react-bootstrap';
//компонент для настройки списка объявлений и задания фильтров
const displayModes = { //режим отображения списка
  list: {
    title: 'Списком',
    salesComponent: ListSalesComponent,
    containerStyle: {
      display: 'block',
    },
  },
  cards: {
    title: 'Карточками',
    salesComponent: CardSalesComponent,
    containerStyle: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      position: 'relative',
    },
  },
};
const sortModes = { //варианты сортировки
  directPrice: {
    title: 'По возрастанию',
    isDirected: true,
    field: 'price',
  },
  reversePrice: {
    title: 'По убыванию',
    isDirected: false,
    field: 'price',
  },
};

export const getDefaultOptions = () => ({ //настройки по умолчанию
  defaultDisplayMode: displayModes.list,
  defaultSortMode: sortModes.direct,
  defaultPriceRange: [0, Infinity],
});

export function FilterBar(props) {
  const dispatch = useDispatch();
  const {
    allCategoryes,
    categoryesById,
    currentCategory,
    sortMode,
    displayMode,
  } = props;
  const {
    setDisplayMode,
    setSortMode,
    setCurrentCategory,
    setPriceRange,
    setTextFilter,
  } = props.hooks;
  const [
    defLowerPriceLimit,
    defUpperPriceLimit,
  ] = getDefaultOptions().defaultPriceRange; //получаем обнуленные значения диапозона цен

  //хуки для филльров по цене и тексту, остальные определены в родителе
  const [lowerPriceLimit, setLowerPriceLimit] = useState(defLowerPriceLimit);
  const [upperPriceLimit, setUpperPriceLimit] = useState(defUpperPriceLimit);
  const [textFilterInputValue, setTextFilterInputValue] = useState('');

  return (
    <div className="filterBar" style={{ textAlign: 'left' }}>
      <div className="displayModeSwithcer">
        <ButtonGroup className="displayModeSwither">
          <p>Отобразить:</p>
          {Object.keys(displayModes).map((m) => {
            let isActiveDisplayMode = false;
            if (displayMode) {
              isActiveDisplayMode = displayMode.title === displayModes[m].title;
            }
            return (
              <Button
                variant={isActiveDisplayMode ? 'success' : 'outline-success'}
                className="mx-1"
                key={displayModes[m].title}
                onClick={() => setDisplayMode(displayModes[m])}
              >
                {displayModes[m].title}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <div className="sortModeSwithcer">
        <ButtonGroup>
          <p>Сортировать цены:</p>
          {Object.keys(sortModes).map((s) => {
            let isActiveSortMode = false;

            if (sortMode) {
              isActiveSortMode = sortMode.title === sortModes[s].title;
            }
            return (
              <Button
                variant={isActiveSortMode ? 'success' : 'outline-success'}
                className="mx-1"
                key={sortModes[s].title}
                onClick={() => {
                  setSortMode(sortModes[s]);
                  dispatch(sortSales({ ...sortModes[s] }));
                }}
              >
                {sortModes[s].title}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <div className="categoryFilter">
        <p>Категория</p>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="categoryFilterDropdown">
            {currentCategory ? currentCategory.name : 'Все'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allCategoryes.map((c) => {
              const { id, name } = categoryesById[c];
              return (
                <Dropdown.Item
                  key={id}
                  onClick={() => setCurrentCategory(categoryesById[c])}
                >
                  {name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="priceFilter">
        <Form inline>
          <Form.Label>
            <p>Цена:</p>
          </Form.Label>
          <FormControl
            type="text"
            placeholder="От:"
            className="mr-sm-2"
            value={lowerPriceLimit}
            onChange={(e) => setLowerPriceLimit(e.target.value)}
          />
          <FormControl
            type="text"
            placeholder="До:"
            className="mr-sm-2"
            value={upperPriceLimit}
            onChange={(e) => setUpperPriceLimit(e.target.value)}
          />
          <Button
            variant="outline-success"
            onClick={() => setPriceRange([lowerPriceLimit, upperPriceLimit])}
          >
            Применить
          </Button>
        </Form>
      </div>
      <div className="textFilter">
        <p>Поиск:</p>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Поиск в тексте"
            className="mr-sm-2"
            value={textFilterInputValue}
            onChange={(e) => setTextFilterInputValue(e.target.value)}
          />
          <Button
            variant="outline-success"
            onClick={(e) => setTextFilter(textFilterInputValue)}
          >
            Поиск
          </Button>
        </Form>
      </div>
    </div>
  );
}

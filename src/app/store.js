import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../appSlice';
import newsReducer from '../features/newsPage/newsSlice';
import salesReducer from '../features/salesPage/salesSlice';


export default configureStore({
  reducer: {
    app: appReducer, //обищие
    news: newsReducer, //новости
    sales: salesReducer, //объявления
  },
});

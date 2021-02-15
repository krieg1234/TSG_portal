import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortBy, } from 'lodash';
import { Sale } from './Sale';
//асинхронный запрос перечня объявлений
export const fetchSales=createAsyncThunk('sales/fetchedSales', async ()=>{
  console.log('call fetchSales')
  const responce=await fetch('https://jsonplaceholder.typicode.com/comments');
  const json=await responce.json();
  
  //привдения структры данных с сервера к структуре стора и атрибутов компонентов
  const normalyzedData=json.map(s=>{
        const newElement={
      id:String(s.id),
      header:`${s.id}. ${s.name}`,
      author:'krieg1234',
      price:Math.round(Math.random()*10000) ,
      email:s.email,
      phone:'+79096669530',
      categoryId:Math.round(Math.random()*(Math.floor(3)-Math.ceil(1)+1)+Math.ceil(1)),
      content:s.body,
    }
    return newElement;
  });
  return normalyzedData.filter((s,index)=>index<10);
})

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    salesById:{},
    allSales:[],
    status:'idle',
    error:null,
    categoryesById: { //перечень категорий объявлений
      0: {
        id: 0,
        name: 'Не указано',
      },
      1: {
        id: 1,
        name: 'Строительные материалы',
      },
      2: {
        id: 2,
        name: 'Аренда жилья',
      },
      3: {
        id: 3,
        name: 'Инструменты',
      },
      4:{
        id:4,
        name:'Мебель'
      }
    },
    allCategoryes: [0, 1, 2, 3,4],
  },
  reducers: {
    addSale: (state, { payload }) => {
      const {
        header,
        author,
        email,
        phone,
        content,
        categoryId,
        price,
      } = payload;
      const newSale = new Sale(); //переделать на обычный объект, ругается на несериализуемый элемент стора
      newSale.setHeader(header);
      newSale.setAuthor(author);
      newSale.setEmail(email);
      newSale.setPhone(phone);
      newSale.setContent(content);
      newSale.setCategoryId(categoryId);
      newSale.setPrice(price);
      console.log('ADD SALE',newSale);
      return {
        ...state,
        allSales: [...state.allSales, newSale.id],
        salesById: { ...state.salesById, [newSale.id]: newSale },
      };
    },
    sortSales: (state, { payload }) => {
      console.log('\nСортируем...');     
      const { isDirected, field } = payload;
      const sortedSales = sortBy(state.allSales, [
        (saleId) => (state.salesById[saleId][field ? field : 'price']),
      ]);
      const newAllSales = isDirected ? sortedSales : sortedSales.reverse();
      return { ...state, allSales: newAllSales };
    },
    addCategory: (state, { payload }) => {
      return state;
    },
    removeCategory: (state, { payload }) => {
      return state;
    },
  },
  extraReducers:{ //отслеживание состояния асинхронной запроса
    [fetchSales.pending]:(state)=>{
      state.status='loading'
    },
    [fetchSales.fulfilled]:(state,{payload})=>{
      state.status='success';
      state.allSales=payload.map(s=>s.id);
      state.salesById=payload.reduce((acc,sale)=>({...acc,[sale.id]:sale}),{});

    },
    [fetchSales.rejected]:(state,{error})=>{
      console.log('payload  rejected:\n',error )
      state.status='failed';
      state.error=error.message;
    }
  }
});

export const { addSale, removeSale, editSale, sortSales } = salesSlice.actions;

export const selectSales = (state) => {
  return { ...state.sales };
};

export default salesSlice.reducer;


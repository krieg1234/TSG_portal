import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sortBy, } from 'lodash';
import { Sale } from './Sale';

export const fetchSales=createAsyncThunk('sales/fetchedSales', async ()=>{
  console.log('call fetchSales')
  const responce=await fetch('https://jsonplaceholder.typicode.com/comments');
  const json=await responce.json();
  
  const normalyzedData=json.map(s=>{
    
    const newElement={
      id:s.id,
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
  return normalyzedData;
})

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    salesById:{},
    allSales:[],
    status:'idle',
    error:null,
    categoryesById: {
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
      const newSale = new Sale();
      newSale.setHeader(header);
      newSale.setAuthor(author);
      newSale.setEmail(email);
      newSale.setPhone(phone);
      newSale.setContent(content);
      newSale.setCategoryId(categoryId);
      newSale.setPrice(price);
      console.log(newSale);
      return {
        ...state,
        allSales: [...state.allSales, newSale.id],
        salesById: { ...state.salesById, [newSale.id]: newSale },
      };
    },
    removeSale: (state, { payload }) => {
      return state;
    },
    editSale: (state, { payload }) => {
      return state;
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
  extraReducers:{
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



// salesById: {
    //   100: {
    //     id: 100,
    //     header: 'Объявление 1',
    //     author: 'krieg1234',
    //     price: 1000,

    //     email: 'olegkrieg@gmail.com',
    //     phone: '+79096669530',

    //     categoryId: 2,
    //     content:
    //       '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo dolores nam quos optio nisi?',
    //   },
    //   200: {
    //     id: 200,
    //     header: 'Объявление 2',
    //     author: 'olegkrieg',
    //     price: 2000,

    //     email: 'krieg@gmail.com',
    //     phone: '+76669996699',

    //     categoryId: 1,
    //     content:
    //       '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo dolores nam quos optio nisi?',
    //   },
    //   300: {
    //     id: 300,
    //     header: 'Объявление 3',
    //     author: 'krieg1234',
    //     price: 666,

    //     email: 'olegkrieg@gmail.com',
    //     phone: '+79096669530',

    //     categoryId: 1,
    //     content:
    //       '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo dolores nam quos optio nisi?',
    //   },
    // },
    // allSales: [100, 200, 300],
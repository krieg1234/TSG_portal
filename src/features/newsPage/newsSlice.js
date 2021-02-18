import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { omit } from 'lodash';
//асинхронный запрос новостей
export const fetchNews=createAsyncThunk('news/fetchedNews',async ()=>{
    const response=await fetch('https://jsonplaceholder.typicode.com/posts');
  const json=await response.json();   
  return  json.filter((n,index)=>index<20);
})

export const newsSlice = createSlice({
  name: 'news',
  initialState:{
    newsById:{},
    allNews:[],
    status:'idle',
    error:null
  },
  reducers: {
    addNews: (state, { payload }) => {
      const newNews = {
        id: Date.now().toString(),
        title: payload.header,
        body: payload.content,
      };
      return {
        ...state,
        allNews: [...state.allNews, newNews.id],
        newsById: { ...state.newsById, [newNews.id]: newNews },
      };
    },
    deleteNews: (state, { payload }) => {
      const newsId = payload.id;
      const newAllNews = state.allNews.filter((id) => id !== newsId);

      return {
        ...state,
        allNews: newAllNews,
        newsById: omit(state.newsById, newsId),
      };
    },
    editNews: (state, { payload }) => {
      const { id, header, content } = payload;
      const editedNews = { ...state.newsById[id], header, content };
      return { ...state, newsById: { ...state.newsById, [id]: editedNews } };
    },
  },
  extraReducers:{ //для работы с асинхронным запросом
    [fetchNews.pending]:(state,{payload})=>{
      state.status='loading';
    },
    [fetchNews.fulfilled]:(state,{payload})=>{
      
      state.status='success';
      const newNews=payload.reduce((acc,n)=>({...acc,[n.id]:n}),{});
      state.allNews=Object.keys(newNews);
      state.newsById=newNews;
    },
    [fetchNews.rejected]:(state,{error})=>{
      state.status='failed';
      state.error=error.message;
    }
  }
});

export const { deleteNews, addNews, editNews } = newsSlice.actions;
export const selectNews = (state) => {
  return { ...state.news };
};
export default newsSlice.reducer;



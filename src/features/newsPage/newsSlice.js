import { createSlice } from '@reduxjs/toolkit';
import { omit } from 'lodash';
export const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsById: {
      1: {
        id: 1,
        header: 'Новость 1',
        content:
          '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo dolores nam quos optio nisi?',
      },
      2: {
        id: 2,
        header: 'Новость 2',
        content:
          '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo dolores nam quos optio nisi?',
      },
      3: {
        id: 3,
        header: 'Новость 3',
        content:
          '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum explicabo dolores nam quos optio nisi?',
      },
    },
    allNews: [1, 2, 3],
  },
  reducers: {
    addNews: (state, { payload }) => {
      const newNews = {
        id: Date.now().toString(),
        header: payload.header,
        content: payload.content,
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
});

export const { deleteNews, addNews, editNews } = newsSlice.actions;
export const selectNews = (state) => {
  return { ...state.news };
};
export default newsSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticlesList, getFullArticle } from '../../services/arcticleServise'
// import { getUserRegistration } from '../../services/userServise'

export const fetchArticles = createAsyncThunk('/articles/fetchArticles', async (offset) => {
  return await getArticlesList(offset)
})

export const fetchFullArticle = createAsyncThunk('/articles/fetchFullArticle', async () => {
  return await getFullArticle()
})

const getpostSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    articlesCount: 0,
    status: null,
    error: null,
    offset: 0,
    currentPage: 1,
    slug: '',
  },
  reducers: {
    updateOffset: (state, { payload }) => {
      state.offset = payload
    },
    updatePage: (state, { payload }) => {
      state.currentPage = payload
    },
    updateSlug: (state, { payload }) => {
      state.slug = payload
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'Loading'
      state.error = null
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.status = 'Resolved'
      state.posts = action.payload
    },
    [fetchArticles.rejected]: (state, action) => {
      state.status = 'Error'
      state.error = action.payload
    },
    // [fetchFullArticle.pending]: (state) => {
    //   state.status = 'Loading'
    //   state.error = null
    // },
    // [fetchFullArticle.fulfilled]: (state, action) => {
    //   state.status = 'Resolved'
    //   state.slug = action.payload
    // },
    // [fetchFullArticle.rejected]: (state, action) => {
    //   state.status = 'Error'
    //   state.error = action.payload
    // },
  },
})
export const { updateOffset, updatePage, updateSlug } = getpostSlice.actions

export default getpostSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticlesList, getFullArticle, getNewArticle } from '../../services/arcticleServise'
// import { getUserRegistration } from '../../services/userServise'

export const fetchArticles = createAsyncThunk('/articles/fetchArticles', async (offset) => {
  return await getArticlesList(offset)
})

export const fetchFullArticle = createAsyncThunk('/articles/fetchFullArticle', async () => {
  return await getFullArticle()
})

export const fetchGetNewArticle = createAsyncThunk('/articles/fetchGetNewArticle', async (isValidData) => {
  return await getNewArticle(isValidData)
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
    newPost: [],
    sendPost: false,
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
    [fetchArticles.fulfilled]: (state, { payload }) => {
      state.status = 'Resolved'
      state.posts = payload
      state.sendPost = false
    },
    [fetchArticles.rejected]: (state, { payload }) => {
      state.status = 'Error'
      state.error = payload
    },
    [fetchGetNewArticle.pending]: (state) => {
      state.status = 'Loading'
      state.error = null
      state.sendPost = false
    },
    [fetchGetNewArticle.fulfilled]: (state, { payload }) => {
      state.status = 'Resolved'
      state.newPost = payload
      state.error = payload
      state.sendPost = true
    },
    [fetchGetNewArticle.rejected]: (state, { payload }) => {
      state.status = 'Rejected'
      state.error = payload
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

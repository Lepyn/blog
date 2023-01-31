import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArticlesList,
  getFullArticle,
  getNewArticle,
  deleteOwnArticle,
  editOwnArticle,
  sendLikeForArticle,
  removeLikeForArticle,
} from '../../services/arcticleServise'
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

export const fetchDeleteOwnArticle = createAsyncThunk('/articles/fetchDeleteOwnArticle', async (slug) => {
  return await deleteOwnArticle(slug)
})

export const fetchEditOwnArticle = createAsyncThunk('/articles/fetchEditOwnArticle', async (slug, isValidData) => {
  return await editOwnArticle(slug, isValidData)
})

export const fetchLikeForArticleAdd = createAsyncThunk('/article/fetchLikeForArticle', async (slug, countLike) => {
  return await sendLikeForArticle(slug, countLike)
})

export const fetchLikeForArticleRemove = createAsyncThunk('/article/fetchLikeForArticleRemove', async (slug, countLike) => {
  return await removeLikeForArticle(slug, countLike)
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
    deletePost: false,
    editPost: false,
    currentArticle: null,
    currentLike: null,
    likeCount: 1,
    // newEditPost: {
    //   title: '',
    //   description: '',
    //   body: '',
    // },
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
    updatePageAfterDel: (state) => {
      state.deletePost = false
    },
    updateArticle: (state, { payload }) => {
      const updatedArticle = payload
      state.currentArticle = updatedArticle
      const index = state.posts.findIndex((a) => a.slug === updatedArticle.slug)
      state.articles[index] = updatedArticle
    },
    // updatefavoriteRequest: (state) => {
    //   state.loading = true
    //   state.error = null
    // },
    // updatefavoriteSuccess: (state, { payload }) => {
    //   state.loading = false
    //   state.likeCount = payload
    //   console.log(state.likeCount)
    // },
    // updatefavoriteError: (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    // },
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
    [fetchDeleteOwnArticle.pending]: (state) => {
      state.status = 'Loading'
      state.error = null
      state.deletePost = false
    },
    [fetchDeleteOwnArticle.fulfilled]: (state) => {
      state.status = 'Resolved'
      state.deletePost = true
    },
    [fetchDeleteOwnArticle.rejected]: (state, { payload }) => {
      state.status = 'Error'
      state.error = payload
    },
    [fetchLikeForArticleAdd.pending]: (state) => {
      state.status = 'Resolved'
      state.likeCount = false
      state.posts.favorited = false
    },
    [fetchLikeForArticleAdd.fulfilled]: (state, { payload }) => {
      state.status = 'Resolved'
      state.posts.favoritesCount = payload
      state.posts.favorited = true
      state.likeCount = true
    },
    [fetchLikeForArticleRemove.pending]: (state) => {
      state.status = 'Resolved'
      state.likeCount = false
      state.posts.favorited = false
    },
    [fetchLikeForArticleRemove.fulfilled]: (state) => {
      state.status = 'Resolved'
      state.likeCount = false
      state.posts.favorited = false
    },

    // [fetchEditOwnArticle.pending]: (state, { payload }) => {
    //   state.status = 'Loading'
    //   state.error = payload
    //   state.editPost = false
    // },
    // [fetchEditOwnArticle.fulfilled]: (state, { payload }) => {
    //   state.status = false
    //   state.editPost = true
    //   state.newEditPost = payload
    //   state.slug = payload
    // },
    // [fetchEditOwnArticle.rejected]: (state, action) => {
    //   state.status = 'Error'
    //   state.error = action.payload
    // },
  },
})
export const { updateOffset, updatePage, updateSlug, updatePageAfterDel, updateArticle, updatefavoriteRequest, updatefavoriteSuccess, updatefavoriteError } =
  getpostSlice.actions

export default getpostSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getArticlesList,
  getFullArticle,
  getNewArticle,
  deleteOwnArticle,
  editOwnArticle,
  // sendLikeForArticle,
  // removeLikeForArticle,
} from '../../services/arcticleServise'
// import { getUserRegistration } from '../../services/userServise'

export const fetchArticles = createAsyncThunk('/articles/fetchArticles', async (offset) => {
  return await getArticlesList(offset)
})

export const fetchFullArticle = createAsyncThunk('/articles/fetchFullArticle', async (slug) => {
  return await getFullArticle(slug)
})

export const fetchGetNewArticle = createAsyncThunk('/articles/fetchGetNewArticle', async (isValidData) => {
  return await getNewArticle(isValidData)
})

export const fetchDeleteOwnArticle = createAsyncThunk('/articles/fetchDeleteOwnArticle', async (slug) => {
  return await deleteOwnArticle(slug)
})

// export const fetchEditOwnArticle = createAsyncThunk('/articles/fetchEditOwnArticle', async (slugData) => {
//   return await editOwnArticle(slugData)
// })
export const fetchEditOwnArticle = createAsyncThunk('articles/fetchEditOwnArticle', async (slugData, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const { key } = slugData
  console.log(slugData)
  const response = await fetch(`https://blog.kata.academy/api/articles/${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(slugData.validData),
  })
  if (!response.ok) {
    return rejectWithValue('Article not updated')
  }
  return await response.json()
})

export const fetchLikeArticle = createAsyncThunk('articles/fetchLikeArticle', async (slug, { rejectWithValue }) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`https://blog.kata.academy/api/articles/${slug[1]}/favorite`, {
    method: !slug[0] ? 'POST' : 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    return rejectWithValue('Лайк не поставлен')
  }
  return await response.json()
})

const getpostSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    article: {
      slug: '',
      title: '',
      description: '',
      body: '',
      createdAt: '',
      updatedAt: '',
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: '',
        bio: '',
        image: '',
        following: false,
      },
    },
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
    favorited: false,
    likeCount: 0,
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
    // updateArticle: (state, { payload }) => {
    //   const updatedArticle = payload
    //   state.currentArticle = updatedArticle
    //   const index = state.posts.findIndex((a) => a.slug === updatedArticle.slug)
    //   state.articles[index] = updatedArticle
    // },
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
    [fetchFullArticle.pending]: (state, { payload }) => {
      state.status = 'Loading'
      state.error = null
    },
    [fetchFullArticle.fulfilled]: (state, { payload }) => {
      state.status = 'Resolved'
      state.favorited = payload
      state.favoritesCount = payload
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
    // [fetchLikeForArticleAdd.pending]: (state) => {
    //   state.status = 'Loading'
    //   state.likeCount = false
    //   state.posts.favorited = false
    // },
    // [fetchLikeForArticleAdd.fulfilled]: (state, { payload }) => {
    //   state.status = 'Resolved'
    //   state.posts.favoritesCount = payload
    //   state.posts.favorited = true
    //   state.likeCount = true
    // },
    [fetchLikeArticle.pending]: (state) => {
      state.status = true
      // state.likeCount = false
      // state.posts.favorited = false
    },
    [fetchLikeArticle.fulfilled]: (state, { payload }) => {
      state.status = false
      // state.likeCount = false
      state.posts.articles.map((article) => {
        if (article.slug === payload.article.slug) article = payload.article
        return article
      })
      // state.posts.favorited = false
    },

    [fetchEditOwnArticle.pending]: (state, { payload }) => {
      state.status = 'Loading'
      state.error = payload
      state.editPost = false
    },
    [fetchEditOwnArticle.fulfilled]: (state, { payload }) => {
      state.status = false
      state.editPost = true
    },
    [fetchEditOwnArticle.rejected]: (state, action) => {
      state.status = 'Error'
      state.error = action.payload
    },
  },
})
export const { updateOffset, updatePage, updateSlug, updatePageAfterDel, updateArticle, updatefavoriteRequest, updatefavoriteSuccess, updatefavoriteError } =
  getpostSlice.actions

export default getpostSlice.reducer

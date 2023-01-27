import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserRegistration, getUserAuth, updateUserData, holdUserAfterUpdate } from '../../services/userServise'

export const fetchUserRegistration = createAsyncThunk('user/fetchRegistrationUser', async (isValidData, { rejectWithValue }) => {
  return await getUserRegistration(isValidData, { rejectWithValue })
})

export const fetchUserGetAuth = createAsyncThunk('user/fetchUserGetAuth', async (isLoginData, { rejectWithValue }) => {
  return await getUserAuth(isLoginData, { rejectWithValue })
})

export const fetchUpdateUserData = createAsyncThunk('user/fetchUpdateUserData', async (isLoginData, { rejectWithValue }) => {
  return await updateUserData(isLoginData, { rejectWithValue })
})

export const fetchHoldUserAfterUpdate = createAsyncThunk('user/fetchHoldUserAfterUpdate', async () => {
  return await holdUserAfterUpdate()
})

const getUserSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      password: '',
      token: '',
      email: '',
      username: '',
      bio: '',
      image: '',
    },
    error: '',
    status: null,
    isReg: false,
    isAuth: false,
    update: false,
  },
  reducers: {
    updateLogout(state) {
      localStorage.removeItem('token')
      state.user = {
        email: '',
        token: '',
        username: '',
        bio: '',
        image: '',
      }
      state.isAuth = false
    },
  },
  extraReducers: {
    [fetchUserRegistration.pending]: (state) => {
      state.status = true
      state.isReg = false
      state.error = ''
    },
    [fetchUserRegistration.fulfilled]: (state, { payload }) => {
      state.status = false
      state.isReg = true
      state.user = payload.user
      state.error = payload.error
    },
    [fetchUserGetAuth.pending]: (state) => {
      state.status = true
      state.error = ''
      state.isAuth = false
    },
    [fetchUserGetAuth.fulfilled]: (state, { payload }) => {
      state.user = payload.user
      state.status = false
      state.isAuth = true
    },
    [fetchUpdateUserData.pending]: (state) => {
      state.status = true
      state.update = false
      state.error = ''
    },
    [fetchUpdateUserData.fulfilled]: (state, { payload }) => {
      state.status = false
      state.update = true
      state.user = payload.user
    },
    [fetchHoldUserAfterUpdate.fulfilled]: (state, { payload }) => {
      state.user = payload.user
      if (localStorage.getItem('token')) {
        state.isAuth = true
      }
    },
  },
})

export const { updateIsReg, updateLogout } = getUserSlice.actions

export default getUserSlice.reducer

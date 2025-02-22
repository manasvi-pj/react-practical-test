import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { strings } from '../constants/strings'

const defaultUser = {
  username: 'admin',
  password: 'Abc@1234'
}

export const login = createAsyncThunk('auth/login', async (data, { getState }) => {
  const { username, password } = data
  if (username === defaultUser.username && password === defaultUser.password) {
    toast.success(strings.loginSuccessToastMsg)
    return { user: { username }, isAuthenticated: true }
  } else {
    toast.error(strings.userLoginFailed)
    return { user: null, isAuthenticated: false }
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    logout: state => {
      state.user = null
      state.isAuthenticated = false
      toast.success(strings.logoutSuccessToastMsg)
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
    })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer

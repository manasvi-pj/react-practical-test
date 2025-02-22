import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import productsReducer from '../features/productsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer
})

export default rootReducer

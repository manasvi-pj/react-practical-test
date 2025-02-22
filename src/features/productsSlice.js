import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const viewProduct = createAsyncThunk('products/viewProduct', async (id, { getState }) => {
  const state = getState()
  const product = state.products.find(product => product.id === id)
  return product
})

const reassignIDs = state => {
  state.forEach((product, index) => {
    product.no = index + 1
  })
}

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now(),
        ...action.payload
      }
      state.push(newProduct)
      reassignIDs(state)
    },
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload
      const taskIndex = state.findIndex(product => product.id === id)
      if (taskIndex !== -1) {
        state[taskIndex] = { id, ...updatedProduct }
        reassignIDs(state)
      }
    },
    deleteProduct: (state, action) => {
      const index = state.findIndex(product => product.id === action.payload)
      if (index !== -1) {
        state.splice(index, 1)
        reassignIDs(state)
      }
    },
    toggleProductStatus: (state, action) => {
      const product = state.find(product => product.id === action.payload)
      if (product) {
        product.status = product.status === true ? false : true
        reassignIDs(state)
      }
    },
    clearAllProducts: state => {
      state.length = 0
    }
  }
})

export const { addProduct, updateProduct, deleteProduct, toggleProductStatus, clearAllProducts } = productsSlice.actions
export default productsSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  value: number
}

const initialState: ProductState = {
  value: 0,
}

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
   
    },
})

// Action creators are generated for each case reducer function
export const {  } = ProductSlice.actions

export default ProductSlice.reducer
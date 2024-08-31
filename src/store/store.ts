import { configureStore } from '@reduxjs/toolkit'
import productSlice from './features/products/productSlice'
import { prodcutsApi } from './services/prodcutApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [prodcutsApi.reducerPath]: prodcutsApi.reducer,
    productsR: productSlice,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(prodcutsApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)
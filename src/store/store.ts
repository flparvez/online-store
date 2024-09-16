import { configureStore } from '@reduxjs/toolkit'

import { prodcutsApi } from './services/prodcutApi'
import { categoryApi } from './services/CategoryApi'
import { UserApi } from './services/UserApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from './cartSlice'



export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [prodcutsApi.reducerPath]: prodcutsApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
  
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware).concat(UserApi.middleware).concat(prodcutsApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


setupListeners(store.dispatch)
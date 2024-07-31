import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers( {
    user: userReducer,
})

  const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer
});

export default store;
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'
import messageReducer from './messageSlice.js'
const store = configureStore({
    reducer:{
        user : userReducer,
        message : messageReducer
    }
})

export default store
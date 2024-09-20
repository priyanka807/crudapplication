
import {configureStore} from '@reduxjs/toolkit'
import studentSlice from './features/lorem/loremSlice'

export const store = configureStore({
    reducer:{
        productData:studentSlice,
    }
})


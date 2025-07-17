import { configureStore } from '@reduxjs/toolkit'
import carReducer from './carsSlice.js'
import removeModalReducer from './removeModalSlice.js'

export default configureStore({
  reducer: {
    car: carReducer,
    removeModal: removeModalReducer
  },
})
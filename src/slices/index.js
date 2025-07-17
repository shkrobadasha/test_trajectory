import { configureStore } from '@reduxjs/toolkit'
import carReducer from './carsSlice.js'

export default configureStore({
  reducer: {
    car: carReducer,
  },
})
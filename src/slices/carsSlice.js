import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cars: [],
}

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCars(state, {payload}){
        state.cars = payload
    },
    //rename + change price
    changeCar(state, { payload }) {
      state.cars = state.cars.map(car =>
        car.id === payload.id ? payload : car,
      )
    },
    deleteCar(state, { payload: { id } }) {
      const currentCars = state.cars
      const newCars = currentCars.filter(car => car.id !== id)
      state.cars = newCars
    },
  },
})

export const { setCars, changeCar, deleteCar } = carSlice.actions

export default carSlice.reducer
import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import applicationRoutes from './util/routes'
import { changeCar, setCars } from './slices/carsSlice'
import axios from 'axios'
import RemoveModalWindow from './components/RemoveModalWindow';
import { ToastContainer, toast } from 'react-toastify'
import CarMap from './components/CarMap';

const App = () =>  {
  const dispatch = useDispatch()
  const currentCars = useSelector(state => state.car.cars)
  const [sortConfig, setSortConfig] = useState({sortByYear: -1, sortByPrice: 1})

const sortingByYear = () => {
  const sortDerection = sortConfig.sortByYear
  const sortedArray = [...currentCars].sort((a, b) => (a.year - b.year) * sortDerection) 
  dispatch(setCars(sortedArray));
  setSortConfig({...sortConfig, sortByYear: sortDerection === 1? -1: 1})
};

const sortingByPrice = () => {
  const sortDerection = sortConfig.sortByPrice
  const sortedArray = [...currentCars].sort((a, b) => (a.price - b.price)*sortDerection)
  dispatch(setCars(sortedArray))
  setSortConfig({...sortConfig, sortByPrice: sortDerection === 1? -1: 1})
}

  useEffect(() => {
    const getContent = async () => {
      try {
        const result = await axios.get(applicationRoutes.dataRoute)
        dispatch(setCars(result.data))
      } catch (error) {
        if (error.isAxiosError) {
          toast.error('axiosError')
        }
        else {
          toast.error('networkError')
        }
      }
    }
    getContent()
  }, [])

  return (
    <div className="d-flex justify-content-center mt-3">
      <div className="d-inline-block">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Model</th>
              <th>
                <Button variant="light" onClick={() => sortingByYear()}>Year</Button>
              </th>
              <th>
                <Button variant="light"onClick={() => sortingByPrice()}>Price</Button>
              </th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {currentCars.map(car => (
              <tr key={car.id}>
                <td>
                  <Form.Control
                    type="text"
                    defaultValue={car.name}
                    size="sm"
                    onChange={e => dispatch(changeCar({...car, name: e.target.value}))}
                  />
                </td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>
                  <Form.Control
                    type="number"
                    defaultValue={car.price}
                    size="sm"
                    onChange={(e) => {
                        const newValue = Number(e.target.value);
                        if (!isNaN(newValue)) {
                          dispatch(changeCar({ ...car, price: newValue }));
                        }
                      }
                    }
                  />
                </td>
                <td><RemoveModalWindow carId={car.id}/></td>
              </tr>
            ))}
          </tbody>
      </Table>
      <ToastContainer />
      <CarMap />
    </div>
  </div>
  )
}

export default App


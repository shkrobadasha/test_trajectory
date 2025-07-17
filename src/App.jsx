import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import applicationRoutes from './util/routes'
import { changeCar, setCars } from './slices/carsSlice'
import axios from 'axios'
import RemoveModalWindow from './components/removeModalWindow';

import { ToastContainer, toast } from 'react-toastify'

function App() {
  const dispatch = useDispatch()
  const carsNaw = useSelector(state => state.car.cars)

  useEffect(() => {
    const getContent = async () => {
      try {
        axios.get(applicationRoutes.dataRoute).then(result => dispatch(setCars(result.data)))
      } catch (error) {
        if (error.isAxiosError) {
          //toast.error(t('errors.serverLoadDataError')\)
          //toast.error('axiosError')
          console.log('axiosError')
        }
        else {
          //toast.error('networkError')
          console.log('networkError')
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
                <Button variant="light">Year</Button>
              </th>
              <th>
                <Button variant="light">Price</Button>
              </th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {carsNaw.map(car => (
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
    </div>
  </div>
  )
}

export default App


import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';

const CarMap = () => {
  const currentCars = useSelector(state => state.car.cars);

  return (
    <MapContainer center={[60.0, 31.0]} zoom={8} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {currentCars.map(car => (
        <Marker key={car.id} position={[car.latitude, car.longitude]}>
          <Popup>{car.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default CarMap
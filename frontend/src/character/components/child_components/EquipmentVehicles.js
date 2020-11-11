import React from 'react';

import SelectTableBody from '../../../utils/TableUtils';

import '../../css/tables.css';

export default function EquipmentVehicles({ vehicleList }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>T(Frame)</th>
          <th>T(Wheel)</th>
          <th>T(Hull)</th>
          <th>Typical Speed</th>
          <th>Ram Damage</th>
          <th>Trample Damage</th>
        </tr>
      </thead>
      <tbody>
        {vehicleList.map(vehicle => (
          <tr 
            key={vehicle.id}
            onClick={SelectTableBody}  
          >
            <td>{vehicle.vehicle}</td>
            <td>{vehicle.t_frame}</td>
            <td>{vehicle.t_wheel}</td>
            <td>{vehicle.t_hull}</td>
            <td>{vehicle.typical_speed}</td>
            <td>{vehicle.ram_dm}</td>
            <td>{vehicle.trample_dm}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
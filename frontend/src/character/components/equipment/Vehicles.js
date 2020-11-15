import React from 'react';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';

export default function Vehicles({ vehicleList, setSelected, rowClass, setRowClass }) {
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
            onClick={(event) => {
              setSelected(() => {
                const select = [...vehicleList];
                return select[selectTableRow(event)];
              });
              setRowClass(() => {
                let setClass = new Array(vehicleList.length).join('.').split('.');
                setClass[vehicle.id - 1] = 'selected';
                return setClass;
              });
            }}
            className={rowClass[vehicle.id - 1]}
          >
            <td>{vehicle.item}</td>
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
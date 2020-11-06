import React from 'react';

import '../../css/tables.css';

export default function EquipmentShots({ shots }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Weapon</th>
          <th>Shots Per Pound</th>
        </tr>
      </thead>
      <tbody>
        {shots.map(shot => (
          <tr key={shot.id}>
            <td>{shot.weapon}</td>
            <td>{shot.shots_per_pound}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
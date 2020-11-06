import React from 'react';

import '../../css/tables.css';

export default function EquipmentGear({ gearList }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Item</th>
          <th>Cost</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {gearList.map(gear => (
          <tr key={gear.id}>
            <td>{gear.category}</td>
            <td>{gear.item}</td>
            <td>
              {gear.cost_pounds > 0 ? gear.cost_pounds + '£ ' : null}
              {gear.cost_crowns > 0 ? gear.cost_crowns + 'c ' : null}
              {gear.cost_shilling > 0 ? gear.cost_shilling + 's ' : null}
              {gear.cost_penny > 0 ? gear.cost_penny + 'd ' : null}
              {gear.cost_farthing > 0 ? gear.cost_farthing + 'f ' : null}
              {(gear.cost_pounds === 0 || !gear.cost_pounds) &&
                (gear.cost_crowns === 0 || !gear.cost_crowns) &&
                (gear.cost_shilling === 0 || !gear.cost_shilling) &&
                (gear.cost_penny === 0 || !gear.cost_penny) &&
                (gear.cost_farthing === 0 || !gear.cost_farthing) ? '-' : null}
            </td>
            <td>{gear.weight_lb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
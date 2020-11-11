import React, { useState } from 'react';

import selectTableBody from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';

export default function EquipmentGear({ gearList }) {
  const [category, setCategory] = useState('Animals, Tack, and Vehicles');

  return (
    <div>
      <select
        name="gear"
        id="gear_dropdown"
        value={category}
        onChange={(event) => {
          setCategory(event.target.value)
        }}
      >
        <option key="animals" value="Animals, Tack, and Vehicles">Animals, Tack, and Vehicles</option>
        <option key="clothing" value="Clothing and Accessories">Clothing and Accessories</option>
        <option key="equipment" value="Equipment">Equipment</option>
        <option key="food" value="Food & Drink">Food & Drink</option>
        <option key="lodging" value="Lodging - Accomodations">Lodging - Accomodations</option>
        <option key="services" value="Services">Services</option>
        <option key="tools" value="Tools">Tools</option>
      </select>
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
          {gearList.map(gear =>
            gear.category === category ? (
              <tr
                key={gear.id}
                onClick={selectTableBody}
              >
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
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
}
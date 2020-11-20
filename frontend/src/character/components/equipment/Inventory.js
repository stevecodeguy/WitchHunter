import React, { useState } from 'react';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';

export default function Inventory({ inventory, carryLimit }) {
  const [selectInventory, setSelectInventory] = useState([]);
  const [rowClassInventory, setRowClassInventory] = useState({});
  let equipArr = Object.entries(inventory);

  return (
    <table>
      <thead>
        <tr>
          <th style={{ display: "none" }}>Id</th>
          <th>Item</th>
          <th>Quantity</th>
          <th>Weight (lbs) ea.</th>
          <th>Combined Weight (lbs)</th>
        </tr>
      </thead>
      <tbody>
        {equipArr.map((equip, index) => (
          <tr
            key={index}
            onMouseDown={(event) => {
              console.log(equip[1].id)
              setSelectInventory(equipArr.find(equip => equip[1].id === (event.target.parentNode.cells[0].innerText * 1)));
              setRowClassInventory({ [equip[1].id - 1]: 'selected' });
            }}
            onDoubleClick={() => buyItems(1)}
            className={rowClassInventory[equip[1].id - 1]}
          >
            <td style={{ display: "none" }}>{equip[1].id}</td>
            <td>{equip[0]}</td>
            <td>{equip[1].quantity}</td>
            <td>{equip[1].weightEach}</td>
            <td>{equip[1].weight}</td>
          </tr>
        ))}
        <tr>
          <td colSpan='2'></td>
          <td><b>Total</b></td>
          <td><b>{equipArr.reduce((acc, cur) => acc + cur[1].weight, 0)} / {carryLimit}</b></td>
        </tr>
        <tr>
          <td colSpan='4' className='notes'>Carry Limit is <b>{carryLimit}</b>. Over limit: -1 Ag (min 1), Move -2 cautious, -7 walk , -12 run.  Double limit: -2 (min 1) Ag, Move = 1 cautious, 5 walk , running not possible.</td>
        </tr>
      </tbody>
    </table>
  );
}
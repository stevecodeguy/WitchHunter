import React from 'react';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';

export default function Inventory({ inventory, carryLimit, setSelected, rowClass, setRowClass }) {
  let equipArr = Object.entries(inventory);

  return (
    <table>
      <thead>
        <tr>
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
          // onClick={(event) => {
          //   setSelected(() => {
          //     const select = [...armorList];
          //     return select[selectTableRow(event)];
          //   });
          //   setRowClass(() => {
          //     let setClass = new Array(armorList.length).join('.').split('.');
          //     setClass[armor.id - 1] = 'selected';
          //     return setClass;
          //   });
          // }}
          // className={rowClass[equip.id - 1]}
          >
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
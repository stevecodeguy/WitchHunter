import React, { useContext, useEffect, useState } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Equipment() {
  const { inventory, carryLimit } = useContext(CharacterContext);
  const [emptyEquipmentTable, setEmptyEquipmentTable] = useState([]);
  const [equipArr, setEquipArr] = useState([]);

  useEffect(() => {
    setEquipArr(Object.entries(inventory));
  }, [inventory]);

  useEffect(() => {
    setEmptyEquipmentTable(() => {
      let newArray = [];
      for (let i = 0; i < 10; i++) {
        newArray = [...newArray, i];
      }
      return newArray;
    });
  }, [equipArr]);

  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>EQUIPMENT</h3>
      </div>
      <table id="equipment-table">
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
            <tr key={index}>
              <td>{equip[0]}</td>
              <td>{equip[1].quantity}</td>
              <td>{equip[1].weightEach}</td>
              <td>{equip[1].weight}</td>
            </tr>
          ))}
          {emptyEquipmentTable.map((index) => (
            <tr key={index + 'empty'}>
              <td height="17" colspan="4"></td>
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
    </>
  );
}
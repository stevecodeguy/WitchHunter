import React, { useState, useContext } from 'react';
import { CharacterContext } from '../../../utils/context/CharacterContext';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';

export default function Inventory({ inventory, setInventory, carryLimit }) {
  const [selectInventory, setSelectInventory] = useState([]);
  const [rowClassInventory, setRowClassInventory] = useState({});
  const {
    setCharacterMoney
  } = useContext(CharacterContext)

  let equipArr = Object.entries(inventory);

  const removeItems = (id, item, quantity) => {

    setInventory(() => {
      let newObj = {};
      let equipRemaining = [];

      // If quantity is 1, remove item
      if ((quantity * 1) === 1) {
        equipRemaining = equipArr.filter(equip => equip[1].id !== id || equip[0] !== item);
        
        for (const i in equipRemaining) {
          newObj = {
            ...newObj,
            [equipRemaining[i][0]]: {
              ...equipRemaining[i][1]
            }
          }
        }
      }
      
      // If quantity is greater than 1, quantity -1
      if ((quantity * 1) > 1) {
        const eIndex = equipArr.findIndex(e => e[1].id === id);
        equipRemaining = [...equipArr];
        
        equipRemaining[eIndex][1] = {
          ...equipRemaining[eIndex][1],
          quantity: equipRemaining[eIndex][1].quantity - 1
        }

        newObj = Object.fromEntries(equipRemaining);
      }

      setCharacterMoney(prev => {
        const newMoney = {
          ...prev,
          
        };

        return prev;
      });

      return newObj;
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ display: "block" }}>Id</th>
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
              setSelectInventory(equipArr.find(equip => equip[1].id === (event.target.parentNode.cells[0].innerText * 1)));
              setRowClassInventory({ [[equip[1].id - 1] + equip[0]]: 'selected' });
            }}
            onDoubleClick={(event) => removeItems(
              equip[1].id,
              event.target.parentNode.cells[1].innerText,
              event.target.parentNode.cells[2].innerText,
            )
            }
            className={rowClassInventory[[equip[1].id - 1] + equip[0]]}
          >
            <td style={{ display: "block" }}>{equip[1].id}</td>
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
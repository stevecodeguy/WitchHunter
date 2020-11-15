import React from 'react';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

import '../../css/tables.css';

export default function Armor({ armorList, setSelected, rowClass, setRowClass }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Armor</th>
          <th>Cost</th>
          <th>Armor value</th>
          <th>Agility Penalty</th>
          <th>Movement Penalty</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {armorList.map(armor => (
          <tr
            key={armor.id}
            onClick={(event) => {
              setSelected(() => {
                const select = [...armorList];
                return select[selectTableRow(event)];
              });
              setRowClass(() => {
                let setClass = new Array(armorList.length).join('.').split('.');
                setClass[armor.id - 1] = 'selected';
                return setClass;
              });
            }}
            className={rowClass[armor.id - 1]}
          >
            <td>{armor.item}</td>
            <td>
              {armor.cost_pounds > 0 ? '£' + armor.cost_pounds + ' ' : null}
              {armor.cost_crowns > 0 ? armor.cost_crowns + 'c ' : null}
              {armor.cost_shilling > 0 ? armor.cost_shilling + 's ' : null}
              {armor.cost_penny > 0 ? armor.cost_penny + 'd ' : null}
              {armor.cost_farthing > 0 ? armor.cost_farthing + 'f ' : null}
              {(armor.cost_pounds === 0 || !armor.cost_pounds) &&
                (armor.cost_crowns === 0 || !armor.cost_crowns) &&
                (armor.cost_shilling === 0 || !armor.cost_shilling) &&
                (armor.cost_penny === 0 || !armor.cost_penny) &&
                (armor.cost_farthing === 0 || !armor.cost_farthing) ? '-' : null}
            </td>
            <td>{armor.armor_value}</td>
            <td>{armor.agility_penalty}</td>
            <td>{armor.movement_penalty}</td>
            <td>{armor.weight_lb}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
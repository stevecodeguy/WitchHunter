import React, { useState, useEffect } from 'react';

import EquipmentShots from './Shots';

import { selectTableRow } from '../../../utils/helpers/TableHelpers';

export const WeaponsCategory = React.memo(({ weaponList, shots, setSelected, rowClass, setRowClass }) => {
  return (
    <>
      {!!weaponList && weaponList.length > 0 ? (
        <>
          <table>
            <caption>{weaponList[0].category}</caption>
            <thead>
              <tr>
                <th>Weapon</th>
                <th>Cost</th>
                <th>{weaponList[0].category === 'Melee and Thrown' ? 'Complexity (Thrown)' : 'Complexity'}</th>
                <th>Damage Modifier</th>
                <th>Range</th>
                <th>Size</th>
                <th>Reload</th>
                <th>Weight (lbs)</th>
                <th>Toughness</th>
              </tr>
            </thead>
            <tbody>
              {weaponList.map(weapon => (
                <tr
                  key={weapon.id}
                  onClick={(event) => {
                    setSelected(() => {
                      const select = [...weaponList];
                      return select[selectTableRow(event)];
                    });
                    setRowClass(() => {
                      let setClass = new Array(weaponList.length).join('.').split('.');
                      setClass[weapon.id - 1] = 'selected';
                      return setClass;
                    });
                  }}
                  className={rowClass[weapon.id - 1]}
                >
                  <td>{weapon.weapon}</td>
                  <td>
                    {weapon.cost_pounds > 0 ? '£' + weapon.cost_pounds + ' ' : null}
                    {weapon.cost_crowns > 0 ? weapon.cost_crowns + 'c ' : null}
                    {weapon.cost_shilling > 0 ? weapon.cost_shilling + 's ' : null}
                    {weapon.cost_penny > 0 ? weapon.cost_penny + 'd ' : null}
                    {weapon.cost_farthing > 0 ? weapon.cost_farthing + 'f ' : null}
                    {(weapon.cost_pounds === 0 || !weapon.cost_pounds) &&
                      (weapon.cost_crowns === 0 || !weapon.cost_crowns) &&
                      (weapon.cost_shilling === 0 || !weapon.cost_shilling) &&
                      (weapon.cost_penny === 0 || !weapon.cost_penny) &&
                      (weapon.cost_farthing === 0 || !weapon.cost_farthing) ? '-' : null}
                  </td>
                  <td>{weapon.complexity}</td>
                  <td>{
                    !!weapon.damage_modifier ?
                      weapon.damage_modifier
                      : weaponList[0].category === 'Melee and Thrown' ? '\u2021' : null
                  }</td>
                  <td>{weapon.range}</td>
                  <td>{weapon.size}</td>
                  <td>{weapon.reload}</td>
                  <td>{weapon.weight_lb}</td>
                  <td>{weapon.toughness}</td>
                </tr>
              ))}
              {weaponList[0].category === 'Melee and Thrown' ? (
                <tr>
                  <td colSpan="20" className='note'><p>Damage modifiers with the &#8225; symbol have special rules for use.</p></td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {weaponList[0].category === 'Firearms' ? <EquipmentShots shots={shots} /> : null}
        </>
      )
        : null}
    </>
  );
});
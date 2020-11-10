import React from 'react';

import '../../css/tables.css';

export default function EquipmentWeapons({ weaponList }) {
  return (
    <>
      <table>
        <caption>Archery Weapons</caption>
        <thead>
          <tr>
            <th>Weapon</th>
            <th>Cost</th>
            <th>Complexity</th>
            <th>Damage Modifier</th>
            <th>Range</th>
            <th>Size</th>
            <th>Reload</th>
            <th>Weight (lbs)</th>
            <th>Toughness</th>
          </tr>
        </thead>
        <tbody>
          {weaponList.map(weapon => 
            weapon.category === 'Archery' ? (
            <tr key={weapon.id}>
              <td>{weapon.weapon}</td>
              <td>
                {weapon.cost_pounds > 0 ? weapon.cost_pounds + '£ ' : null}
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
              <td>{weapon.damage_modifier}</td>
              <td>{weapon.range}</td>
              <td>{weapon.size}</td>
              <td>{weapon.reload}</td>
              <td>{weapon.weight_lb}</td>
              <td>{weapon.toughness}</td>
            </tr>
            ) : null
          )}
        </tbody>
      </table>
      <table>
        <caption>Firearms</caption>
        <thead>
          <tr>
            <th>Weapon</th>
            <th>Cost</th>
            <th>Complexity</th>
            <th>Damage Modifier</th>
            <th>Range</th>
            <th>Size</th>
            <th>Reload</th>
            <th>Weight (lbs)</th>
            <th>Toughness</th>
          </tr>
        </thead>
        <tbody>
          {weaponList.map(weapon => 
            weapon.category === 'Firearms' ? (
            <tr key={weapon.id}>
              <td>{weapon.weapon}</td>
              <td>
                {weapon.cost_pounds > 0 ? weapon.cost_pounds + '£ ' : null}
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
              <td>{weapon.damage_modifier}</td>
              <td>{weapon.range}</td>
              <td>{weapon.size}</td>
              <td>{weapon.reload}</td>
              <td>{weapon.weight_lb}</td>
              <td>{weapon.toughness}</td>
            </tr>
            ) : null
          )}
        </tbody>
      </table>
      <table>
        <caption>Melee and Thrown Weapons</caption>
        <thead>
          <tr>
            <th>Weapon</th>
            <th>Cost</th>
            <th>Complexity (Thrown)</th>
            <th>Damage Modifier</th>
            <th>Range</th>
            <th>Size</th>
            <th>Reload</th>
            <th>Weight (lbs)</th>
            <th>Toughness</th>
          </tr>
        </thead>
        <tbody>
          {weaponList.map(weapon => 
            weapon.category === 'Melee and Thrown' ? (
            <tr key={weapon.id}>
              <td>{weapon.weapon}</td>
              <td>
                {weapon.cost_pounds > 0 ? weapon.cost_pounds + '£ ' : null}
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
              <td>{weapon.complexity}{!!weapon.complexity_thrown ? ' (' + weapon.complexity_thrown + ')' : null}</td>
              <td>{!!weapon.damage_modifier ? weapon.damage_modifier : '\u2021' }</td>
              <td>{weapon.range}</td>
              <td>{weapon.size}</td>
              <td>{weapon.reload}</td>
              <td>{weapon.weight_lb}</td>
              <td>{weapon.toughness}</td>
            </tr>
            ) : null
          )}
          <tr>
            <td colSpan="20" className='note'><p>Damage modifiers with the &#8225; symbol have special rules for use.</p></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
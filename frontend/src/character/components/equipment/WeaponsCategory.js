import React from 'react';

import Shots from './Shots';

export const WeaponsCategory = React.memo(({ weaponList, shots, buyItems, setSelected, rowClass, setRowClass }) => {
  return (
    <>
      {weaponList?.length > 0 ? (
        <>
          <table>
            <caption>{weaponList[0].category}</caption>
            <thead>
              <tr>
                <th style={{display: "none"}}>Id</th>
                <th>Weapon</th>
                <th>Cost</th>
                <th>Complexity</th>
                {weaponList[0].category === 'Melee and Thrown' ? <th>Complexity (Thrown)</th> : null}
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
                  onMouseDown={(event) => {
                    setSelected(weaponList.find(weapon => weapon.id === (event.target.parentNode.cells[0].innerText * 1)));
                    setRowClass({ [weapon.id - 1]: 'selected' });
                  }}
                  onDoubleClick={(event) => buyItems(event, 1)}
                  className={rowClass[weapon.id - 1]}
                >
                  <td style={{display: "none"}}>{weapon.id}</td>
                  <td>{weapon.item}</td>
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
                  {weaponList[0].category === 'Melee and Thrown' ? <td>{weapon.complexity_thrown}</td> : null}
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
          {weaponList[0].category === 'Firearms' ? <Shots shots={shots} /> : null}
        </>
      )
        : null}
    </>
  );
});
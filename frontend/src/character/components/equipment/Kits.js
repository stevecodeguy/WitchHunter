import React from 'react';

import '../../css/tables.css';

export default function Kits({ kitList, setSelected, rowClass, setRowClass }) {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ display: "none" }}>Id</th>
          <th>Kit</th>
          <th>Cost</th>
          <th>Total Weight</th>
        </tr>
      </thead>
      <tbody>
        {kitList.map(kit => (
          <tr
            key={kit.id}
            onClick={(event) => {
              setSelected(kitList.find(kit => kit.id === (event.target.parentNode.cells[0].innerText * 1)));
              setRowClass({ [kit.id - 1]: 'selected' });
            }}
            className={rowClass[kit.id - 1]}
          >
            <td style={{ display: "none" }}>{kit.id}</td>
            <td>{kit.kit}</td>
            <td>
              {kit.cost_pounds > 0 ? '£' + kit.cost_pounds + ' ' : null}
              {kit.cost_crowns > 0 ? kit.cost_crowns + 'c ' : null}
              {kit.cost_shilling > 0 ? kit.cost_shilling + 's ' : null}
              {kit.cost_penny > 0 ? kit.cost_penny + 'd ' : null}
              {kit.cost_farthing > 0 ? kit.cost_farthing + 'f ' : null}
              {(kit.cost_pounds === 0 || !kit.cost_pounds) &&
                (kit.cost_crowns === 0 || !kit.cost_crowns) &&
                (kit.cost_shilling === 0 || !kit.cost_shilling) &&
                (kit.cost_penny === 0 || !kit.cost_penny) &&
                (kit.cost_farthing === 0 || !kit.cost_farthing) ? '-' : null}
            </td>
            <td>{kit.total_weight_pounds}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
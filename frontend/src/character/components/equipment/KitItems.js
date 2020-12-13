import React from 'react';

import '../../css/tables.css';

export default function KitItems({ kitItems, kitCategories }) {
  return (
    <div className='kitItems'>
      {kitCategories.length > 0 ? kitCategories.map(cat => (
        <table className="info" key={cat}>
          <thead>
            <tr>
              <td>
                <h5>{cat}</h5>
              </td>
            </tr>
          </thead>
          <tbody>
            {kitItems.map(i => (
              i.kit === cat ?
                <tr key={i.id}>
                  <td>{i.item}{i.quantity > 1 ? ` (${i.quantity})` : null}</td>
                </tr> : null
            ))}
          </tbody>
        </table>
      )) : null}
    </div>
  );
}
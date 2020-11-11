import React, { useEffect, useState } from 'react';

import '../../css/tables.css';

export default function EquipmentKitItems({ kitItems }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let tempCategory = new Set();

    kitItems.forEach((item) => {
      tempCategory.add(item.kit);
    });

    setCategory(Array.from(tempCategory));
  }, [kitItems]);


  return (
    <div className='kitItems'>
      {category.length > 0 ? category.map(cat => (
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
                  <td>{i.item}</td>
                </tr> : null
            ))}
          </tbody>
        </table>
      )) : null}
    </div>
  );
}
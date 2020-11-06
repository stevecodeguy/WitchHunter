import React, { useEffect, useState } from 'react';

import '../../css/tables.css';

export default function EquipmentKitItems({ kitItems }) {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    let tempCategory = new Set();

    kitItems.map((item) => {
      tempCategory.add(item.kit)
    });

    setCategory(Array.from(tempCategory));
  }, [kitItems]);


  return (
    <>
      {category.length > 0 ? category.map(cat => (
        <ul className='talentCard'>
          {
            <table>
              <thead>
                <tr>
                  <td key={cat}>
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
          }
        </ul>
      )) : null}
    </>
  );
}
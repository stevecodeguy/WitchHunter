import React, { useState } from 'react';

import WeaponsCategory from './EquipmentWeaponsCategory';

import '../../css/tables.css';

export default function EquipmentWeapons({ weaponList, shots }) {
  const [category, setCategory] = useState('Archery');

  const updateCategory = weaponList.filter(weapon => weapon.category === category);

  return (
    <div>
      <select
        name="weapons"
        id="weapons_dropdown"
        value={category}
        onChange={(event) => {
          setCategory(event.target.value)
        }}
      >
        <option key="archery" value="Archery">Archery</option>
        <option key="firearms" value="Firearms">Firearms</option>
        <option key="melee" value="Melee and Thrown">Melee and Thrown</option>
      </select>
      <WeaponsCategory weaponList={updateCategory} shots={shots}/>
    </div>
  );
}
import React, { useEffect } from 'react';

import { WeaponsCategory } from './WeaponsCategory';

import '../../css/tables.css';

export default function Weapons({ weaponList, shots, buyItems, setSelected, rowClass, setRowClass, categorySelected, setCategorySelected }) {

  const updateCategory = weaponList.filter(weapon => weapon.category === categorySelected.sub);

  useEffect(() => {
    //set default sub category
    !!categorySelected.sub ? null : setCategorySelected(prev => { return { ...prev, sub: 'Archery' } });
  }, [categorySelected, setCategorySelected]);

  return (
    <div>
      <select
        name="weapons"
        id="weapons_dropdown"
        value={categorySelected.sub}
        onChange={(event) => {
          setSelected([]);
          setRowClass([]);
          setCategorySelected(prev => { return { ...prev, sub: event.target.value } });
        }}
      >
        <option key="archery" value="Archery">Archery</option>
        <option key="firearms" value="Firearms">Firearms</option>
        <option key="melee" value="Melee and Thrown">Melee and Thrown</option>
      </select>
      <WeaponsCategory
        weaponList={updateCategory}
        shots={shots}
        setSelected={setSelected}
        rowClass={rowClass}
        setRowClass={setRowClass}
        buyItems={buyItems}
      />
    </div>
  );
};
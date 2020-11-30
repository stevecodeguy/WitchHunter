import React from 'react';

import Weapons from './Weapons';
import WeaponShots from './WeaponShots';
import Armor from './Armor';
import Health from './Health';
import Equipment from './Equipment';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function CombatAbilities() {

  return (
    <>
      <div className="combat-abilities">
        <Weapons />
        <WeaponShots />
        <Armor />
        <Health />
        <Equipment />
      </div>

      <div className="combat-abilities">
        <div className="sheet-title">
          <img src={tornPaper} />
          <h3>COMBAT DICE POOLS</h3>
        </div>
      </div>
    </>
  );
}
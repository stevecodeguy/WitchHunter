import React from 'react';

import Weapons from './Weapons';
import WeaponShots from './WeaponShots';
import Armor from './Armor';
import Health from './Health';
import Equipment from './Equipment';
import DicePools from './DicePools';

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
        <DicePools />
      </div>
    </>
  );
}
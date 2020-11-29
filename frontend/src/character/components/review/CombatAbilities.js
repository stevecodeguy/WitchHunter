import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import Weapons from './Weapons';
import WeaponShots from './WeaponShots';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function CombatAbilities() {

  return (
    <>
      <div className="combat-abilities">
        <Weapons />
        <WeaponShots />
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
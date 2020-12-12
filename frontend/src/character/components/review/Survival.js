import React, { useContext } from 'react';

import { CharacterContext } from '../../../utils/context/CharacterContext';

import tornPaper from '../../img/characterSheet/torn_paper.svg';

export default function Survival() {
  return (
    <>
      <div className="sheet-title">
        <img src={tornPaper} />
        <h3>SURVIVAL POINTS</h3>
      </div>
      <div className='blank-space'>
        <div></div>
      </div>
    </>
  );
}